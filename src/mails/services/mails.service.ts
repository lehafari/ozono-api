import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Payment } from 'src/payments/models/payment.model';

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

  async sendApprovedPaymentMail(payment: Payment, to: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Pago aprobado ✔',
      template: 'approved-payment',
      context: {
        payment: payment,
      },
    });
  }
}
