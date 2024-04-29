import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignToDealDto {
  @ApiProperty()
  @IsString()
  deal_Id: string;
}
