import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, isUUID } from 'class-validator';

export class CreateScoreDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  quizId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
