import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail() {
    await this.mailerService.sendMail({
      to: 'alejomedina161011@gmail.com, rouchjq8@gmail.com',
      from: 'alejomedina161011@gmail.com',
      subject: 'La solucion a todos tus problemas ✔',
      html: '',
      context: {
        name: 'Nest',
      },
    });
  }
}
