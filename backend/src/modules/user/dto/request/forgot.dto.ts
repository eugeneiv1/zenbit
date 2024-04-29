import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ForgotDto {
  @ApiProperty()
  @IsString()
  email: string;
}
