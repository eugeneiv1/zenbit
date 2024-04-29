import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';

import configuration from '../configs/config';
import { AuthModule } from './auth/auth.module';
import { DealModule } from './deal/deal.module';
import { PostgressModule } from './postgress/postgress.module';
import { RepositoryModule } from './repository/repository.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: configService.get('smtp.smtp_user'),
            pass: configService.get('smtp.smtp_password'),
          },
        },
      }),
    }),
    ScheduleModule.forRoot(),
    PostgressModule,
    RepositoryModule,
    AuthModule,
    DealModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
