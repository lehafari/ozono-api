import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateScoreWithUserIdDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  quizId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
