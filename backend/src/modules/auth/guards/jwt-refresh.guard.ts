import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ETokenType } from '../enums/token-type.enum';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const refreshToken = request.get('Authorization').split('Bearer ')[1];
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.tokenService.checkToken(
      refreshToken,
      ETokenType.REFRESH,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const findInDB = await this.refreshTokenRepository.findOneBy({
      refreshToken,
    });
    if (!findInDB) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({ id: payload.id });
    if (!user) {
      throw new UnauthorizedException();
    }

    request.user = {
      user,
    };

    return true;
  }
}
