import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './models/lesson.model';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
})
export class LessonsModule {}
