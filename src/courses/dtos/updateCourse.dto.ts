import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Boolean, Level, Status } from '../enum';

export class UpdateCourseDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  duration: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  category: string;

  @ApiProperty()
  @IsEnum(Level)
  @IsOptional()
  level: Level;

  @ApiProperty()
  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @ApiProperty()
  @IsEnum(Boolean)
  @IsOptional()
  premium: Boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  premiumPrice: number;

  @ApiProperty()
  @IsEnum(Boolean)
  @IsOptional()
  own: Boolean;
}
