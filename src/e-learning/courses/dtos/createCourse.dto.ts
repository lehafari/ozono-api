import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Boolean, Level, Status } from '../enum';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsEnum(Level)
  @IsNotEmpty()
  level: Level;

  @ApiProperty()
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @ApiProperty()
  @IsEnum(Boolean)
  @IsNotEmpty()
  premium: Boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  premiumPrice: number;

  @ApiProperty()
  @IsEnum(Boolean)
  @IsNotEmpty()
  own: Boolean;
}
