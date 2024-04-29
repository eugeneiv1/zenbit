import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgressConfigService } from './postgress.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgressConfigService,
    }),
  ],
  providers: [],
  controllers: [],
})
export class PostgressModule {}
