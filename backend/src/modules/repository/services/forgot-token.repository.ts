import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ForgotTokenEntity } from '../../../database/entities/forgot-token.entity';

@Injectable()
export class ForgotTokenRepository extends Repository<ForgotTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ForgotTokenEntity, dataSource.manager);
  }
}
