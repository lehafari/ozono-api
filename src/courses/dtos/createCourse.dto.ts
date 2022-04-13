import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsBoolean()
  @IsNotEmpty()
  premium: boolean;

  @IsNumber()
  @IsNotEmpty()
  premiumPrice: number;

  @IsBoolean()
  @IsNotEmpty()
  own: boolean;
}
