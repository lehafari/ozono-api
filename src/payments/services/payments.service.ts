import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from '../dtos';
import { Payment } from '../models/payment.model';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly userService: UsersService,
  ) {}

  //***** Find all payments *****//
  async findAll(): Promise<Payment[]> {
    try {
      return await this.paymentRepository.find();
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
      const payment = this.paymentRepository.create(createPaymentDto);
      payment.user = user;
      return await this.paymentRepository.save(payment);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //***** Approve payment ******//
  async approve(id: string): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.findOne(id);
      if (payment.paymentStatus === true) {
        throw new ForbiddenException('Payment already approved');
      }
      payment.paymentStatus = true;
      return await this.paymentRepository.save(payment);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //***** Reject payment ******//
  async reject(id: string): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.findOne(id);
      if (payment.paymentStatus === false) {
        throw new ForbiddenException('Payment already rejected');
      }
      payment.paymentStatus = false;
      return await this.paymentRepository.save(payment);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //***** Check course payment status *****//
  async checkPaymentStatus(courseId: string, userId: string): Promise<Boolean> {
    try {
      const payment = await this.paymentRepository.find({
        where: { courseId, userId, paymentStatus: true },
      });
      if (
        payment.length === 0 ||
        payment === undefined ||
        payment === null ||
        !payment
      ) {
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
