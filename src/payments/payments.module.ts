import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/e-learning/courses/courses.module';
import { UsersModule } from 'src/users/users.module';
import { PaymentsController } from './controllers/payments.controller';
import { Payment } from './models/payment.model';
import { PaymentsService } from './services/payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), UsersModule, CoursesModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
