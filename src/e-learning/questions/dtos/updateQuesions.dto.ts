import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { questionType } from '../enum';

export class UpdateQuestionsDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  question: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  answer: string;

  @ApiProperty({
    enum: questionType,
  })
  @IsEnum(questionType)
  @IsOptional()
  type: questionType;
}
