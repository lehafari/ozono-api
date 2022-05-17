import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOptionDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  option: string;
}
