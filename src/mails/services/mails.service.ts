import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Course } from 'src/e-learning/courses/models/course.model';
import { Payment } from 'src/payments/models/payment.model';
import { User } from 'src/users/models/user.model';

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

  async sendApprovedPaymentMail(payment: Payment, course: Course, user: User) {
    const { amount, id, createdAt } = payment;
    const { title } = course;
    const { firstName, lastName } = user;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Pago aprobado ✔ || ' + title,
      template: 'approved-payment',
      context: {
        amount,
        id,
        course: title,
        name: firstName,
        lastname: lastName,
        date: createdAt,
      },
    });
  }

  async sendNoticePaymentMail(payment: Payment, course: Course, user: User) {
    const { amount, id, createdAt } = payment;
    const { title } = course;
    const { firstName, lastName } = user;
    await this.mailerService.sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: 'Solicitud de pago',
      template: 'notice-payment',
      context: {
        amount,
        id,
        course: title,
        name: firstName,
        lastname: lastName,
        date: createdAt,
      },
    });
  }
}
