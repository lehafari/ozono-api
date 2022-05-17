import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSectionDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  name: string;
}
