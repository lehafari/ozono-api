import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsArray } from 'class-validator';
import { CreateOptionDto } from 'src/e-learning/options/dtos';
import { questionType } from '../enum';

export class CreateQuestionsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  options: CreateOptionDto[];

  @ApiProperty({
    enum: questionType,
  })
  @IsEnum(questionType)
  @IsNotEmpty()
  type: questionType;
}
