import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { DealRepository } from '../../repository/services/deal.repository';

@Injectable()
export class DaysCulcService {
  constructor(private readonly dealRepository: DealRepository) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async daysLeft(): Promise<void> {
    const deals = await this.dealRepository.find();
    deals.map(async (deal) => {
      const daysLeft = deal.total_days - 1;
      if (daysLeft < 0) {
        await this.dealRepository.delete({ id: deal.id });
      }
      await this.dealRepository.update({ id: deal.id }, {total_days: daysLeft});
    });
  }
}

