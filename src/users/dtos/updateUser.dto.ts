import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Roles } from '../enum/roles.enum';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ type: String, format: 'email' })
  @IsEmail()
  @IsOptional()
  email: string;

  // @ApiProperty({ type: Date })
  // @IsDate()
  // @IsOptional()
  // birthDate: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  gender: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  ci: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsEnum(Roles)
  @IsOptional()
  role: Roles;
}
