import { ForbiddenException, Injectable } from '@nestjs/common';
import { Roles } from 'src/users/enum/roles.enum';
import { User } from 'src/users/models/user.model';
import { UsersRepository } from 'src/users/repositories/user.repository';
import {
  AddTeacherDto,
  AddUserDto,
  CreateCourseDto,
  UpdateCourseDto,
} from '../dtos';
import { Status } from '../enum';
import { Course } from '../models/course.model';
import { CoursesRepository } from '../repositories/courses.repository';
import { CoursesResponse } from '../types';

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseRepository: CoursesRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  //!   *******************************************
  //!  COURSES CRUD
  //!   *******************************************

  //***** Create course *****//
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const courseEntity = await this.courseRepository.create(createCourseDto);
      const course = await this.courseRepository.save(courseEntity);
      return course;
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('El curso ya existe');
      }
      throw new ForbiddenException(error.message);
    }
  }

  //***** Get all courses *****//

  async getAllCourses(): Promise<Course[]> {
    const courses = await this.courseRepository.find();
    if (courses.length === 0) {
      throw new ForbiddenException('No hay cursos');
    }
    return courses;
  }

  //***** Get course by id *****//

  async getCourseById(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne(id);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    return course;
  }

  //***** Get course by status *****//

  async getCourseByStatus(status: Status): Promise<Course[]> {
    const courses = await this.courseRepository.findByStatus(status);
    if (courses.length === 0) {
      throw new ForbiddenException('No hay cursos');
    }
    return courses;
  }
  //***** Update course *****//
  //! Only Admin and Teacher
  async updateCourse(
    courseId: string,
    course: UpdateCourseDto,
  ): Promise<CoursesResponse> {
    const updatedCourse = await this.courseRepository.updateCourse(
      courseId,
      course,
    );
    if (!updatedCourse) {
      throw new ForbiddenException('El curso no existe');
    }
    return updatedCourse;
  }

  //!   *******************************************
  //!  MANAGE TEACHERS IN COURSES
  //!   *******************************************

  //***** Get teachers by course *****//
  async getTeachersByCourseId(id: string): Promise<User[]> {
    const course = await this.courseRepository.findOne(id);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const teachers = await this.courseRepository.getTeachersByCourseId(id);
    if (teachers.length === 0) {
      throw new ForbiddenException('No hay profesores');
    }
    teachers.map((teacher: User) => {
      delete teacher.password;
      delete teacher.refreshToken;
    });
    return teachers;
  }

  //***** Add teacher to a course *****//
  //! Only Admin
  async addTeacherToCourse(
    addTeacherDto: AddTeacherDto,
  ): Promise<CoursesResponse> {
    const course = await this.courseRepository.findOne(addTeacherDto.courseId);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const teacher = await this.userRepository.findOne(addTeacherDto.teacherId);
    if (!teacher) {
      throw new ForbiddenException('El profesor no existe');
    }
    if (teacher.role !== Roles.TEACHER) {
      throw new ForbiddenException('El usuario no es profesor');
    }
    return this.courseRepository.addTeacherToCourse(addTeacherDto);
  }

  //*****Remove teacher from a course *****//
  //! Only Admin
  async removeTeacherFromCourse(
    addTeacherDto: AddTeacherDto,
  ): Promise<CoursesResponse> {
    const course = await this.courseRepository.findOne(addTeacherDto.courseId);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const teacher = await this.courseRepository.getTeacherByCourseId(
      addTeacherDto.courseId,
      addTeacherDto.teacherId,
    );
    console.log(teacher);
    if (!teacher) {
      throw new ForbiddenException(
        'El profesor no esta registrado en el curso',
      );
    }

    return await this.courseRepository.removeTeacherFromCourse(addTeacherDto);
  }

  //!   *******************************************
  //!  MANAGE USERS IN COURSES
  //!   *******************************************

  //***** Get users by course *****//
  async getUsersByCourseId(id: string): Promise<User[]> {
    const course = await this.courseRepository.findOne(id);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const users = await this.courseRepository.getUsersByCourseId(id);
    if (users.length === 0) {
      throw new ForbiddenException('No hay alumnos en el curso');
    }
    users.map((user) => {
      delete user.password;
      delete user.refreshToken;
    });
    return users;
  }

  //***** Add user to a course *****//
  //! Only Admin
  async addUserToCourse(addUserDto: AddUserDto): Promise<CoursesResponse> {
    const course = await this.courseRepository.findOne(addUserDto.courseId);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const user = await this.userRepository.findOne(addUserDto.userId);
    if (!user) {
      throw new ForbiddenException('El usuario no existe');
    }
    return this.courseRepository.addUserToCourse(addUserDto);
  }

  //*****Remove user from a course *****//
  //! Only Admin
  async removeUserFromCourse(addUserDto: AddUserDto): Promise<CoursesResponse> {
    const course = await this.courseRepository.findOne(addUserDto.courseId);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const user = await this.courseRepository.getUserByCourseId(
      addUserDto.courseId,
      addUserDto.userId,
    );
    if (!user) {
      throw new ForbiddenException('El usuario no esta registrado en el curso');
    }
    return await this.courseRepository.removeUserFromCourse(addUserDto);
  }
}
