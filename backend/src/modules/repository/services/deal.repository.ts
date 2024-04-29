import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DealEntity } from '../../../database/entities/deal.entity';

@Injectable()
export class DealRepository extends Repository<DealEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(DealEntity, dataSource.manager);
  }
}
