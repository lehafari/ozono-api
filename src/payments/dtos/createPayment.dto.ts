import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { paymentMethod } from '../enums';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: paymentMethod })
  @IsEnum(paymentMethod)
  paymentMethod: paymentMethod;

  @ApiProperty()
  @IsString()
  paymentReference: string;

  @ApiProperty()
  @IsString()
  courseId: string;
}
