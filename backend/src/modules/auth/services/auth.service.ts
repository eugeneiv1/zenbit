import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../../repository/services/user.repository';
import { SignRequestDto } from '../dto/request/sign.request.dto';
import { AuthResponseDto } from '../dto/response/auth.response.dto';
import { IUserData } from '../interfaces/user-data.interface';
import { AuthMapper } from './auth.mapper';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}
  public async signUp(dto: SignRequestDto): Promise<void> {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (user) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(dto.password, 7);

    await this.userRepository.save(
      this.userRepository.create({ ...dto, password: hashedPassword }),
    );
  }

  public async signIn(dto: SignRequestDto): Promise<AuthResponseDto> {
    const userEntity = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { password: true, id: true },
    });

    if (!userEntity) {
      throw new UnauthorizedException();
    }

    const isPasswordMatch = await bcrypt.compare(
      dto.password,
      userEntity.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({ id: userEntity.id });

    const tokenPair = await this.tokenService.generateTokenPair({
      userId: user.id,
    });

    await this.tokenService.deleteTokens(user.id);
    await this.tokenService.saveTokens(user.id, tokenPair);

    return AuthMapper.toAuthResponse(user, tokenPair);
  }

  public async logout(user: IUserData): Promise<void> {
    await this.tokenService.deleteTokens(user.userId);
  }

  public async refreshTokenPair(currentUser: IUserData) {
    await this.tokenService.deleteTokens(currentUser.userId);

    const tokenPair = await this.tokenService.generateTokenPair({
      userId: currentUser.userId,
    });

    await this.tokenService.saveTokens(currentUser.userId, tokenPair);

    return tokenPair;
  }
}
