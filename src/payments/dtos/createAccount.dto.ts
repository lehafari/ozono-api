import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAccount {
  @ApiProperty()
  @IsOptional()
  @IsString()
  titularName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bank: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  document: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  accountType: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;
}
