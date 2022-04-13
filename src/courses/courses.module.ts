import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './controllers/courses.controller';
import { Course } from './models/course.model';
import { CoursesRepository } from './repositories/courses.repository';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CoursesRepository])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
