import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MailService } from './services/mail.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  providers: [UserService, MailService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
