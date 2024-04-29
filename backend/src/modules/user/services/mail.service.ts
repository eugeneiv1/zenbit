import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { Config } from '../../../configs/config.type';
import { EEmailAction } from '../enums/email-action.enum';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly mailService: MailerService,
  ) {}

  public async sendMail(
    email: string | string[],
    emailAction: EEmailAction,
    token: string,
  ) {
    const emailConfig = this.configService.get('smtp');
    const frontUrl = emailConfig.front_url;
    const mailOptions = {
      from: 'eugeneiv1@gmail.com',
      to: email,
      subject: 'dgnkm',
      text: `${frontUrl}${token}`,
    };

    return await this.mailService.sendMail(mailOptions);
  }
}
