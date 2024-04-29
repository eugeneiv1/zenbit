import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';

import { DealEntity } from '../../database/entities/deal.entity';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { AddDealRequestDto } from './dto/request/addDeal.request.dto';
import { DealService } from './services/deal.service';

@ApiTags('Deals')
@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}
  @SkipAuth()
  @Get()
  @ApiOperation({ summary: 'Get all deals' })
  public async getAll(): Promise<DealEntity[]> {
    return await this.dealService.getAll();
  }
  @SkipAuth()
  @Post()
  @ApiOperation({ summary: 'Add new deal' })
  @UseInterceptors(FileInterceptor('file'))
  public async addDeal(
    @Body() dto: AddDealRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.dealService.addDeal(file, dto);
  }
}
