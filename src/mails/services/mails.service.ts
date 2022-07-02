import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Course } from 'src/e-learning/courses/models/course.model';
import { Payment } from 'src/payments/models/payment.model';
import { User } from 'src/users/models/user.model';
import { ContactDto } from '../dtos/contac.dto';
const pdf = require('html-pdf');

import * as fs from 'fs';
import path from 'path';
import { getContent } from '../certificates/model';

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
    try {
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
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendContactMail(contactDto: ContactDto) {
    await this.mailerService.sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: `${contactDto.supportType}`,
      template: 'contact',
      context: {
        name: contactDto.name,
        email: contactDto.email,
        message: contactDto.message,
      },
    });
  }
  async sendCertificateMail(user: User, course: Course, certificateId: string) {
    try {
      const { firstName, lastName } = user;
      const { title } = course;

      await pdf
        .create(getContent(firstName, lastName, title, certificateId))
        .toFile(
          path.join(__dirname, `../../../certificates/${certificateId}.pdf`),
          function (err, res) {
            if (err) {
              null;
            } else {
              null;
            }
          },
        );

      setTimeout(async () => {
        try {
          await this.mailerService.sendMail({
            to: user.email,
            subject: 'Certificado del curso ✔ || ' + title,
            template: 'certificate',
            attachments: [
              {
                filename: `${certificateId}.pdf`,
                path: path.join(
                  __dirname,
                  `../../../certificates/${certificateId}.pdf`,
                ),
                contentType: 'application/pdf',
              },
            ],

            context: {
              name: firstName,
              lastname: lastName,
              course: title,
            },
          });
        } catch (error) {
          return false;
        }
      }),
        2000;
    } catch (error) {
      console.log(error);
    }
  }
}
