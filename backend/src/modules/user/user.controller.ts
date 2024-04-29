import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { ForgotDto } from './dto/request/forgot.dto';
import { SetForgotDto } from './dto/request/setForgot.dto';
import { SignToDealDto } from './dto/request/sign-to-deal.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get()
  public async getUser(
    @Request() req: Request & { user: IUserData },
  ): Promise<UserResponseDto> {
    return await this.userService.getUser(req.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sign to deal' })
  @Post('/sign-to-deal')
  public async signToDeal(
    @Request() req: Request & { user: IUserData },
    @Body() dto: SignToDealDto,
  ) {
    return await this.userService.signToDeal(dto, req.user);
  }

  @SkipAuth()
  @Post('/forgot')
  public async forgot(@Body() dto: ForgotDto) {
    return await this.userService.forgot(dto);
  }

  @SkipAuth()
  @Post('/forgot/:forgotToken')
  public async setForgot(
    @Param('forgotToken') forgotToken: string,
    @Body() dto: SetForgotDto,
  ) {
    return await this.userService.setForgot(forgotToken, dto);
  }
}
