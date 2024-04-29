import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRepository } from '../../repository/services/user.repository';
import { SKIP_AUTH } from '../constants/constants';
import { ETokenType } from '../enums/token-type.enum';
import { AuthCacheService } from '../services/auth-cache.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
    private authCacheService: AuthCacheService,
    private userRepository: UserRepository,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (skipAuth) return true;

    const request = ctx.switchToHttp().getRequest();
    const accessToken = request.get('Authorization')?.split('Bearer ')[1];

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.tokenService.checkToken(
      accessToken,
      ETokenType.ACCESS,
    );

    if (!payload) {
      throw new UnauthorizedException();
    }

    const findInRedis = await this.authCacheService.isAccessTokenExist(
      payload.userId,
      accessToken,
    );

    if (!findInRedis) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({ id: payload.userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    request.user = {
      ...payload,
      email: user.email,
    };

    return true;
  }
}
