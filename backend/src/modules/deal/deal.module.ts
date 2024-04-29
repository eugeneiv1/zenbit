import { Module } from '@nestjs/common';

import { DealController } from './deal.controller';
import { DaysCulcService } from './services/days-culc.service';
import { DealService } from './services/deal.service';
import { S3Service } from './services/s3.service';

@Module({
  imports: [],
  providers: [DealService, S3Service, DaysCulcService],
  controllers: [DealController],
})
export class DealModule {}
