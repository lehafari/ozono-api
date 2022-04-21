import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { CoursesController } from './controllers/courses.controller';
import { Course } from './models/course.model';
import { CoursesRepository } from './repositories/courses.repository';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, CoursesRepository, UsersRepository]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
