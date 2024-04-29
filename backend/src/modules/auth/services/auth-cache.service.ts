import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JWTConfig } from '../../../configs/config.type';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JWTConfig;
  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get<JWTConfig>('jwt');
  }

  public async saveAccessToken(
    userId: string,
    accessToken: string,
  ): Promise<void> {
    const key = `access_token:${userId}`;

    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, accessToken);
    await this.redisService.expire(key, this.jwtConfig.accessTokenExpiration);
  }

  public async isAccessTokenExist(
    userId: string,
    accessToken: string,
  ): Promise<boolean> {
    const tokens = await this.redisService.sMembers(`access_token:${userId}`);
    return tokens.some((token: string) => token === accessToken);
  }

  public async deleteAccessToken(userId: string): Promise<void> {
    await this.redisService.deleteByKey(`access_token:${userId}`);
  }
}
