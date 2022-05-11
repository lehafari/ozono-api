import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from '../courses/courses.module';
import { Course } from '../courses/models/course.model';
import { CoursesRepository } from '../courses/repositories/courses.repository';
import { CoursesService } from '../courses/services/courses.service';
import { SectionsController } from './controllers/section.controller';
import { Section } from './models/section.model';
import { SectionRepository } from './repositories/sections.repository';
import { SectionsService } from './services/sections.service';

@Module({
  controllers: [SectionsController],
  imports: [
    TypeOrmModule.forFeature([Section, SectionRepository]),
    CoursesModule,
  ],
  providers: [SectionsService],
})
export class SectionsModule {}
