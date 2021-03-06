import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from 'src/e-learning/courses/dtos';
import { CoursesService } from 'src/e-learning/courses/services/courses.service';
import { MailsService } from 'src/mails/services/mails.service';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from '../dtos';
import { CreateAccount } from '../dtos/createAccount.dto';
import { PaymentStatus } from '../enums';
import { Account } from '../models/accounts.model';
import { Payment } from '../models/payment.model';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly userService: UsersService,
    private readonly mailService: MailsService,
    private readonly courseService: CoursesService,
  ) {}

  //***** Find all payments *****//
  async findAll() {
    try {
      const payment = await this.paymentRepository.find();
      const allPayments = payment.map(async (payment) => {
        const user = await this.userService.findUserByPayment(payment.id);
        const course = await this.courseService.getCourseById(payment.courseId);
        delete user.password;
        delete user.refreshToken;
        delete user.payments;
        return { payment, user, course };
      });
      const promisePayments = Promise.all(allPayments);
      return promisePayments;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //***** Find payment by id *****//
  async findOne(id: string): Promise<Payment> {
    try {
      return await this.paymentRepository.findOne(id);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //***** Find payments by user id *****//
  async findByUserId(userId: string): Promise<Payment[]> {
    try {
      return await this.paymentRepository.find({
        where: { userId },
      });
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //***** Create payment *****//
  async create(
    userId: string,
    createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    try {
      const user = await this.userService.findById(userId);
      delete user.password;
      delete user.refreshToken;
      const payment = this.paymentRepository.create(createPaymentDto);
      const course = await this.courseService.getCourseById(payment.courseId);
      payment.user = user;
      const savePayment = await this.paymentRepository.save(payment);
      await this.mailService.sendNoticePaymentMail(savePayment, course, user);

      return savePayment;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //***** Approve payment ******//
  async approve(id: string): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.findOne(id);
      const user = await this.userService.findUserByPayment(id);
      delete user.password;
      delete user.refreshToken;
      const course = await this.courseService.getCourseById(payment.courseId);
      console.log(payment);
      if (payment.paymentStatus === PaymentStatus.APPROVED) {
        throw new ForbiddenException('Payment already approved');
      }
      payment.paymentStatus = PaymentStatus.APPROVED;
      const paymentAprobed = await this.paymentRepository.save(payment);
      await this.mailService.sendApprovedPaymentMail(payment, course, user);
      const addUserDto: AddUserDto = { userId: user.id, courseId: course.id };
      await this.courseService.addUserToCourse(addUserDto);
      return paymentAprobed;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //***** Reject payment ******//
  async reject(id: string): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.findOne(id);
      if (payment.paymentStatus === PaymentStatus.REJECTED) {
        throw new ForbiddenException('Payment already rejected');
      }

      payment.paymentStatus = PaymentStatus.REJECTED;
      return await this.paymentRepository.save(payment);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //***** Check course payment status *****//
  async checkPaymentStatus(courseId: string, userId: string): Promise<Boolean> {
    try {
      const paymentStatus = PaymentStatus.APPROVED;
      const payment = await this.paymentRepository
        .createQueryBuilder('payment')
        .leftJoinAndSelect('payment.user', 'user')
        .where('payment.courseId = :courseId', { courseId })
        .andWhere('payment.userId = :userId', { userId })
        .andWhere('payment.paymentStatus = :paymentStatus', { paymentStatus })
        .getOne();
      if (payment === undefined) {
        return false;
      }
      return true;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //*****  Update payment ******//
  async update(id: string, payment: Payment): Promise<Payment> {
    try {
      await this.paymentRepository.update(id, payment);
      return await this.paymentRepository.findOne(id);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //***** Delete payment *****//
  async delete(id: string): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.findOne(id);
      await this.paymentRepository.delete(id);
      return payment;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //***** Set payment account *****//
  async setPaymentAccount(createAccount: CreateAccount) {
    try {
      const accounts = await this.accountRepository
        .createQueryBuilder('account')
        .getMany();
      if (accounts.length === 0) {
        const account = this.accountRepository.create(createAccount);
        await this.accountRepository.save(account);
        return account;
      }
      accounts.map(async (account) => {
        await this.accountRepository.update(account.id, createAccount);
        return await this.accountRepository.findOne(account.id);
      });
    } catch (error) {}
  }

  //***** Get payment account *****//
  async getPaymentAccount() {
    try {
      const accounts = await this.accountRepository
        .createQueryBuilder('account')
        .getOne();
      return accounts;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}

// async create(
//   userId: string,
//   createPaymentDto: CreatePaymentDto,
// ): Promise<Payment> {
//   try {
//     const payment = this.paymentRepository.create(createPaymentDto);
//     payment.userId = userId;
//     return await this.paymentRepository.save(payment);
//   } catch (error) {
//     throw new ForbiddenException(error);
//   }
// }
