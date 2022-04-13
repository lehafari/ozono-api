import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../dtos/createCourse.dto';
import { Course } from '../models/course.model';
import { CoursesRepository } from '../repositories/courses.repository';

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepository: CoursesRepository) {}

  //***** Create course *****//
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const courseEntity = await this.courseRepository.create(createCourseDto);
      const course = await this.courseRepository.save(courseEntity);
      return course;
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('El curso  ya existe');
      }
      throw error();
    }
  }
}
