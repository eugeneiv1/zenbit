import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Config, JWTConfig } from '../../../configs/config.type';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { TokenResponseDto } from '../dto/response/token.response.dto';
import { ETokenType } from '../enums/token-type.enum';
import { JwtPayloadType } from '../types/jwt-payload.type';
import { AuthCacheService } from './auth-cache.service';

@Injectable()
export class TokenService {
  private jwtConfig: JWTConfig;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<Config>,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly authCacheService: AuthCacheService,
  ) {
    this.jwtConfig = this.configService.get<JWTConfig>('jwt');
  }

  public async generateTokenPair(
    payload: JwtPayloadType,
  ): Promise<TokenResponseDto> {
    const accessToken = await this.generateToken(payload, ETokenType.ACCESS);
    const refreshToken = await this.generateToken(payload, ETokenType.REFRESH);
    return { accessToken, refreshToken };
  }

  public async checkToken(token: string, tokenType: ETokenType) {
    try {
      const secret = this.setSecret(tokenType);
      return this.jwtService.verify(token, { secret });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  public async saveTokens(
    userId: string,
    tokenPair: TokenResponseDto,
  ) {
    await Promise.all([
      this.authCacheService.saveAccessToken(userId, tokenPair.accessToken),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_Id: userId,
          refreshToken: tokenPair.refreshToken,
        }),
      ),
    ]);
  }

  public async deleteTokens(userId: string) {
    await Promise.all([
      this.refreshTokenRepository.delete({
        user_Id: userId,
      }),
      this.authCacheService.deleteAccessToken(userId),
    ]);
  }

  private async generateToken(
    payload: JwtPayloadType,
    tokenType: ETokenType,
  ): Promise<string> {
    const secret = this.setSecret(tokenType);
    const expiresIn = this.setExpiresIn(tokenType);
    return await this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  private setSecret(tokenType: ETokenType): string {
    switch (tokenType) {
      case ETokenType.ACCESS:
        return this.jwtConfig.accessTokenSecret;
      case ETokenType.REFRESH:
        return this.jwtConfig.accessTokenSecret;
    }
  }

  private setExpiresIn(tokenType: ETokenType) {
    switch (tokenType) {
      case ETokenType.ACCESS:
        return this.jwtConfig.accessTokenExpiration;
      case ETokenType.REFRESH:
        return this.jwtConfig.refreshTokenExpiration;
    }
  }
}
