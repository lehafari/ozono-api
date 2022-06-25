import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { GetUser } from 'src/users/decorators';
import { Roles } from 'src/users/enum/roles.enum';
import { CreatePaymentDto } from '../dtos';
import { Payment } from '../models/payment.model';
import { PaymentsService } from '../services/payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  //***** Find all payments *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all payments' })
  @Get('findAll')
  async findAll(): Promise<Payment[]> {
    return await this.paymentsService.findAll();
  }

  //***** Find payment by id *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find payment by id' })
  @Get('findById/:id')
  async findById(@Param('id') id: string): Promise<Payment> {
    return await this.paymentsService.findOne(id);
  }

  //***** Find payments by user id *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find payments by user id' })
  @Get('findByUserId/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<Payment[]> {
    return await this.paymentsService.findByUserId(userId);
  }

  //***** Create payment *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create payment' })
  @Get('create')
  async create(
    @GetUser('sub') userId: string,
    createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    return await this.paymentsService.create(userId, createPaymentDto);
  }
}
