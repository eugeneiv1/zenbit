import { Global, Module } from '@nestjs/common';

import { DealRepository } from './services/deal.repository';
import { ForgotTokenRepository } from './services/forgot-token.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';
import { UserToDealRepository } from './services/user-to-deal.repository';

const repositories = [
  DealRepository,
  UserRepository,
  RefreshTokenRepository,
  UserToDealRepository,
  ForgotTokenRepository,
];
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
