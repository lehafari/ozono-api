import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Level, Status } from '../enum';

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
  @IsBoolean()
  @IsOptional()
  premium: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  premiumPrice: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  own: boolean;
}
