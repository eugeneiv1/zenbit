import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { DealEntity } from '../../../database/entities/deal.entity';
import { DealRepository } from '../../repository/services/deal.repository';
import { AddDealRequestDto } from '../dto/request/addDeal.request.dto';
import { S3Service } from './s3.service';

@Injectable()
export class DealService {
  constructor(
    private readonly dealRepository: DealRepository,
    private readonly s3Service: S3Service,
  ) {}

  public async getAll(): Promise<DealEntity[]> {
    return await this.dealRepository.find();
  }

  public async addDeal(file: Express.Multer.File, dto: AddDealRequestDto) {
    const deal = await this.dealRepository.findOneBy({ name: dto.name });
    if (deal) {
      throw new ConflictException('Deal with such name already exist');
    }

    const filePath = await this.s3Service.uploadFile(file, 'deal', dto.name);

    await this.dealRepository.save(
      this.dealRepository.create({ ...dto, image: filePath }),
    );
  }
}
