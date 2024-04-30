import { Injectable, OnModuleInit } from '@nestjs/common';

import { DealRepository } from '../modules/repository/services/deal.repository';

@Injectable()
export class DbInitService implements OnModuleInit {
  constructor(private readonly dealRepository: DealRepository) {}
  async onModuleInit(): Promise<void> {
    const items = [
      {
        name: 'The Marina Torch',
        total_price: 6500000,
        ticket_price: 60000,
        yield: '9.25',
        total_days: 150,
        sold: 75,
        image:
          'https://zenbit-test-project.s3.eu-north-1.amazonaws.com/deal/The+Marina+Torch/77633855-d36a-4413-979a-7dfbb0e2586bmarina.jpg',
      },
      {
        name: 'HHHR Tower',
        total_price: 6500000,
        ticket_price: 60000,
        yield: '9.25',
        total_days: 150,
        sold: 75,
        image:
          'https://zenbit-test-project.s3.eu-north-1.amazonaws.com/deal/HHHR+Tower/cb968e86-6c92-42ee-a1bd-00a7f4e9a1dchhhr.jpg',
      },
      {
        name: 'Ocean peaks',
        total_price: 6500000,
        ticket_price: 60000,
        yield: '9.25',
        total_days: 150,
        sold: 75,
        image:
          'https://zenbit-test-project.s3.eu-north-1.amazonaws.com/deal/Ocean+peaks/c2ab2a6a-b88d-44a8-b163-656f31ed3732ocean.jpg',
      },
      {
        name: 'AI Yaqoub Tower',
        total_price: 6500000,
        ticket_price: 60000,
        yield: '9.25',
        total_days: 150,
        sold: 75,
        image:
          'https://zenbit-test-project.s3.eu-north-1.amazonaws.com/deal/AI+Yaqoub+Tower/ad21ff5c-2d38-4c78-b02a-961d7c039057AI.jpg',
      },
    ];
    items.map(
      async (item) =>
        await this.dealRepository.save(
          this.dealRepository.create({
            name: item.name,
            total_price: item.total_price,
            ticket_price: item.ticket_price,
            yield: parseInt(item.yield),
            total_days: item.total_days,
            sold: item.sold,
            image: item.image,
          }),
        ),
    );
  }
}
