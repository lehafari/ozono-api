import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

export class DeleteCategories {
  // validate an array of objects
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  ids: { id: string; title: string }[];
}
