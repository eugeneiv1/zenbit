import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserToDealEntity } from '../../../database/entities/user-to-deal.entity';

@Injectable()
export class UserToDealRepository extends Repository<UserToDealEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserToDealEntity, dataSource.manager);
  }
}
