import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { GetUser } from 'src/users/decorators';
import { Roles } from 'src/users/enum/roles.enum';
import { User } from 'src/users/models/user.model';
import { CreatePaymentDto } from '../dtos';
import { CreateAccount } from '../dtos/createAccount.dto';
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
  async findAll() {
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
  @Put('create')
  async create(
    @GetUser('sub') userId: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    return await this.paymentsService.create(userId, createPaymentDto);
  }

  //***** Approved payment *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approved payment' })
  @Put('approved/:id')
  async approved(@Param('id') id: string): Promise<Payment> {
    return await this.paymentsService.approve(id);
  }

  //***** Rejected payment *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Rejected payment' })
  @Put('rejected/:id')
  async rejected(@Param('id') id: string): Promise<Payment> {
    return await this.paymentsService.reject(id);
  }

  //***** Check payment ******//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check payment' })
  @Get('check/:courseId')
  async check(
    @GetUser('sub') userId: string,
    @Param('courseId') courseId: string,
  ): Promise<Boolean> {
    return await this.paymentsService.checkPaymentStatus(courseId, userId);
  }

  //***** Set payment account ******//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set payment account' })
  @Put('setAccount')
  async setAccount(@Body() createAccount: CreateAccount) {
    return await this.paymentsService.setPaymentAccount(createAccount);
  }

  //***** Get payment account ******//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment account' })
  @Get('getAccount')
  async getAccount() {
    return await this.paymentsService.getPaymentAccount();
  }
}
