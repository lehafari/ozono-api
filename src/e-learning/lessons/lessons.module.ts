import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsModule } from '../sections/sections.module';
import { LessonsController } from './controllers/lessons.controller';
import { Lesson } from './models/lesson.model';
import { LessonRepository } from './repositories/lesson.repository';
import { LessonsService } from './services/lessons.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, LessonRepository]),
    SectionsModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
