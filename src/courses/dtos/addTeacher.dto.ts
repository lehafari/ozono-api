import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTeacherDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  teacherId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  courseId: string;
}
