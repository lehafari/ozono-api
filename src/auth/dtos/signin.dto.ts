import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userOrEmail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
