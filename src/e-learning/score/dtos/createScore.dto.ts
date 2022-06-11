import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

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
  @IsArray()
  @IsNotEmpty()
  options: options[];
}

type options = { title: string; isCorrect: boolean };
