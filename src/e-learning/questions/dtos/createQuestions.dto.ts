import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { questionType } from '../enum';

export class CreateQuestionsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({
    enum: questionType,
  })
  @IsEnum(questionType)
  @IsNotEmpty()
  type: questionType;
}
