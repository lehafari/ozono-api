import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { MailsService } from '../services/mails.service';

@Controller('mails')
export class MailsController {
  constructor(private readonly mailService: MailsService) {}

  @ApiOperation({ summary: 'Send email' })
  @Get()
  async sendEmail() {
    console.log(
      '🚀 ~ file: mails.controller.ts ~ line 15 ~ MailsController ~ sendEmail ~ process.env.MAIL_HOST',
      process.env.MAIL_HOST,
    );

    console.log(
      '🚀 ~ file: mails.controller.ts ~ line 17 ~ MailsController ~ sendEmail ~ process.env.MAIL_USERNAME',
      process.env.MAIL_USERNAME,
    );

    console.log(
      '🚀 ~ file: mails.controller.ts ~ line 19 ~ MailsController ~ sendEmail ~ process.env.MAIL_PASSWORD',
      process.env.MAIL_PASSWORD,
    );

    await this.mailService.sendMail();
  }
}
