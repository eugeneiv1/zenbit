import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class AddDealRequestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  total_price: number;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  ticket_price: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  yield: number;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  total_days: number;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  sold: number;
}
