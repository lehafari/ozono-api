import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { EntityRepository, Repository } from 'typeorm';
import { AddTeacherDto, AddUserDto, UpdateCourseDto } from '../dtos';
import { Status } from '../enum';
import { Course } from '../models/course.model';
import { Response } from '../types';

@EntityRepository(Course)
export class CoursesRepository extends Repository<Course> {
  //***** Find by status *****//
  async findByStatus(status: Status): Promise<Course[]> {
    const courses = await this.find({
      where: {
        status,
      },
    });
    if (courses.length === 0) {
      throw new ForbiddenException('No hay cursos');
    }
    return courses;
  }

  //***** Update course *****//
  async updateCourse(id: string, course: UpdateCourseDto): Promise<Response> {
    const updateCourse = await this.createQueryBuilder()
      .update(Course)
      .set(course)
      .where('id = :id', { id })
      .execute();
    if (!updateCourse) {
      throw new ForbiddenException('El curso no existe');
    }
    const response = {
      statusCode: HttpStatus.OK,
      message: 'Curso actualizado con exito',
    };
    return response;
  }

  //***** Delete course *****//
  async deleteCourse(id: string): Promise<Response> {
    const course = await this.findOne(id);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const deleteCourse = await this.createQueryBuilder()
      .delete()
      .from(Course)
      .where('id = :id', { id })
      .execute();
    if (!deleteCourse) {
      throw new ForbiddenException('El curso no existe');
    }
    const response = {
      statusCode: HttpStatus.OK,
      message: 'Curso eliminado con exito',
    };
    return response;
  }

  //***** Feature a course *****//
  async setFeatured(id: string): Promise<Response> {
    let response: Response | PromiseLike<Response>;
    const course = await this.findOne(id);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    if (course.featured === true) {
      course.featured = false;
      response = {
        statusCode: HttpStatus.OK,
        message: 'Curso eliminado de destacados',
      };
    } else {
      course.featured = true;
      response = {
        statusCode: HttpStatus.OK,
        message: 'Curso destacado con exito',
      };
    }
    await this.createQueryBuilder()
      .update()
      .set({ featured: course.featured })
      .where('id = :id', { id })
      .execute();
    return response;
  }

  //!   *******************************************
  //!  MANAGE TEACHERS IN COURSES
  //!   *******************************************

  //***** Get teachers by course id ******//
  async getTeachersByCourseId(id: string): Promise<User[]> {
    const teachers = await this.createQueryBuilder()
      .relation(Course, 'teachers')
      .of(id)
      .loadMany();
    return teachers;
  }

  //***** Get unique teacher by course id *****//
  async getTeacherByCourseId(
    courseId: string,
    teacherId: string,
  ): Promise<User> {
    const teachers = await this.getTeachersByCourseId(courseId);
    const teacher = teachers.find((teacher) => teacher.id === teacherId);
    return teacher;
  }

  //***** Add teacher to a course *****//
  async addTeacherToCourse(addTeacherDto: AddTeacherDto): Promise<Response> {
    try {
      await this.createQueryBuilder()
        .relation(Course, 'teachers')
        .of(addTeacherDto.courseId)
        .add(addTeacherDto.teacherId);
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException(
          'El profesor ya esta registrado en el curso',
        );
      }
      throw new ForbiddenException(error.message);
    }
    const response = {
      statusCode: HttpStatus.OK,
      message: 'Profesor agregado con exito',
    };
    return response;
  }

  //***** Remove teacher from a course *****//
  async removeTeacherFromCourse(
    addTeacherDto: AddTeacherDto,
  ): Promise<Response> {
    try {
      await this.createQueryBuilder()
        .relation(Course, 'teachers')
        .of(addTeacherDto.courseId)
        .remove(addTeacherDto.teacherId);
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException(
          'El profesor no esta registrado en el curso',
        );
      }
      throw new ForbiddenException(error.message);
    }
    const response = {
      statusCode: HttpStatus.OK,
      message: 'Profesor eliminado del curso con exito',
    };
    return response;
  }

  //!   *******************************************
  //!  MANAGE USERS IN COURSES
  //!   *******************************************

  //***** Get users by course id ******//
  async getUsersByCourseId(id: string): Promise<User[]> {
    const users = await this.createQueryBuilder()
      .relation(Course, 'users')
      .of(id)
      .loadMany();
    return users;
  }

  //***** Get unique user by course id*****//
  async getUserByCourseId(courseId: string, userId: string): Promise<User> {
    const users = await this.getUsersByCourseId(courseId);
    const user = users.find((user) => user.id === userId);
    return user;
  }

  //***** Remove user from a course *****//
  async removeUserFromCourse(addUserDto: AddUserDto): Promise<Response> {
    try {
      await this.createQueryBuilder()
        .relation(Course, 'users')
        .of(addUserDto.courseId)
        .remove(addUserDto.userId);
      const course = await this.findOne(addUserDto.courseId);
      const user = await this.getUsersByCourseId(addUserDto.courseId);
      course.numberOfStudents = user.length;
      await this.update(course.id, course);
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException(
          'El usuario no esta registrado en el curso',
        );
      }
      throw new ForbiddenException(error.message);
    }
    const response = {
      statusCode: HttpStatus.OK,
      message: 'Usuario eliminado del curso con exito',
    };
    return response;
  }

  //***** Add user to a course *****//
  async addUserToCourse(addUserDto: AddUserDto) {
    try {
      await this.createQueryBuilder()
        .relation(Course, 'users')
        .of(addUserDto.courseId)
        .add(addUserDto.userId);
      const course = await this.findOne(addUserDto.courseId);
      const user = await this.getUsersByCourseId(addUserDto.courseId);
      course.numberOfStudents = user.length;
      await this.update(course.id, course);
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException(
          'El usuario ya esta registrado en el curso',
        );
      }
      throw new ForbiddenException(error.message);
    }
    const response = {
      statusCode: HttpStatus.OK,
      message: 'Alumno agregado con exito',
    };
    return response;
  }

  //***** Delete course *****//
}
