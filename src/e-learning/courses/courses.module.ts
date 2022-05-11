import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { SectionsModule } from '../sections/sections.module';
import { CategoriesController } from './controllers/categories.controller';
import { CoursesController } from './controllers/courses.controller';
import { Category } from './models/category.model';
import { Course } from './models/course.model';
import { CategoriesRepository } from './repositories/categories.repository';
import { CoursesRepository } from './repositories/courses.repository';
import { CategoriesService } from './services/categories.service';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      CoursesRepository,
      UsersRepository,
      Category,
      CategoriesRepository,
    ]),
  ],
  exports: [CoursesService, CategoriesService],
  controllers: [CoursesController, CategoriesController],
  providers: [CoursesService, CategoriesService],
})
export class CoursesModule {}
