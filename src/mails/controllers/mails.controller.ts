import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ContactDto } from '../dtos/contac.dto';
import { MailsService } from '../services/mails.service';

@Controller('mails')
export class MailsController {
  constructor(private readonly mailService: MailsService) {}

  @ApiOperation({ summary: 'Send contact emails' })
  @Post('contact')
  async sendContactEmail(@Body() contactDto: ContactDto) {
    console.log(
      '🚀 ~ file: mails.controller.ts ~ line 13 ~ MailsController ~ sendContactEmail ~ contactDto',
      contactDto,
    );

    await this.mailService.sendContactMail(contactDto);
  }
}
