import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ForgotTokenRepository } from '../../repository/services/forgot-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserToDealRepository } from '../../repository/services/user-to-deal.repository';
import { ForgotDto } from '../dto/request/forgot.dto';
import { SetForgotDto } from '../dto/request/setForgot.dto';
import { SignToDealDto } from '../dto/request/sign-to-deal.dto';
import { UserResponseDto } from '../dto/response/user-response.dto';
import { EEmailAction } from '../enums/email-action.enum';
import { MailService } from './mail.service';
import { UserMapper } from './user-mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userToDealRepository: UserToDealRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly forgotTokenRepository: ForgotTokenRepository,
  ) {}

  public async getUser(user: IUserData): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id: user.userId });

    return UserMapper.userResponse(entity);
  }
  public async signToDeal(dto: SignToDealDto, user: IUserData) {
    const userToDeal = await this.userToDealRepository.findOneBy({
      user_Id: user.userId,
      deal_Id: dto.deal_Id,
    });

    if (userToDeal) {
      throw new ConflictException('User already in deal');
    }

    await this.userToDealRepository.save(
      this.userToDealRepository.create({
        user_Id: user.userId,
        deal_Id: dto.deal_Id,
      }),
    );
  }

  public async forgot(dto: ForgotDto) {
    const user = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (!user) {
      throw new NotFoundException('User with such email not found');
    }

    const tokenIsExist = await this.forgotTokenRepository.findOneBy({
      user_Id: user.id,
    });

    if (tokenIsExist) {
      await this.forgotTokenRepository.delete({ user_Id: user.id });
    }

    const tokenConfig = this.configService.get('jwt');
    const forgotToken = this.jwtService.sign(
      { user_Id: user.id },
      {
        secret: tokenConfig.forgotTokenSecret,
        expiresIn: tokenConfig.forgotTokenExpiration,
      },
    );
    await Promise.all([
      this.mailService.sendMail(
        'eugeneiv1@gmail.com', // change to dto.email when real emails will be in db
        EEmailAction.FORGOT_PASSWORD,
        forgotToken,
      ),
      this.forgotTokenRepository.save(
        this.forgotTokenRepository.create({ forgotToken, user_Id: user.id }),
      ),
    ]);
  }

  public async setForgot(forgotToken: string, dto: SetForgotDto) {
    const tokenConfig = this.configService.get('jwt');
    const payload = this.jwtService.verify(forgotToken, {
      secret: tokenConfig.forgotTokenSecret,
    });

    const entity = await this.forgotTokenRepository.findOneBy({ forgotToken });

    if (!entity) {
      throw new UnauthorizedException();
    }

    const newPassword = await bcrypt.hash(dto.password, 7);

    await Promise.all([
      this.userRepository.update(payload.user_Id, { password: newPassword }),
      this.forgotTokenRepository.delete({ forgotToken }),
    ]);
  }
}
