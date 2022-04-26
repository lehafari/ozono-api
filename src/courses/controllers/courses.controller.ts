import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { JwtPayload } from 'src/auth/types';
import { GetUser } from 'src/users/decorators';
import { confirmPasswordDto } from 'src/users/dtos/confirmPassword.dto';
import { Roles } from 'src/users/enum/roles.enum';
import { User } from 'src/users/models/user.model';
import { AddTeacherDto, AddUserDto, CreateCourseDto } from '../dtos';
import { Status } from '../enum';
import { CoursesService } from '../services/courses.service';
import { Response } from '../types';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  //!   *******************************************
  //!  COURSES CRUD
  //!   *******************************************

  //***** Create course *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create course' })
  @HttpCode(HttpStatus.CREATED)
  @Put('create')
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.createCourse(createCourseDto);
  }

  //***** Get all courses *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all courses' })
  @Get('all')
  async getAllCourses() {
    return this.coursesService.getAllCourses();
  }

  //***** Get course by id *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get course by id' })
  @Get('id/:id')
  async getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  //***** Get course by status *****//
  @ApiOperation({ summary: 'Get course by status' })
  @Get('status/:status')
  async getCourseByStatus(@Param('status') status: Status) {
    return this.coursesService.getCourseByStatus(status);
  }

  //***** Update course *****//
  //! Only admin and teacher
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update course',
    description: 'Only admin and teacher',
  })
  @Put('update/:id')
  async updateCourse(
    @Param('id') id: string,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Response> {
    return this.coursesService.updateCourse(id, createCourseDto);
  }

  //***** Delete course *****//
  //! Only admin
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete course' })
  @Delete('delete/:id')
  async deleteCourse(
    @Param('id') id: string,
    @GetUser() user: JwtPayload,
    @Body() confirmPassword: confirmPasswordDto,
  ): Promise<Response> {
    return this.coursesService.deleteCourse(
      user.sub,
      id,
      confirmPassword.password,
    );
  }

  //***** Featured courses *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Featured courses ' })
  @Put('featured/:id')
  async setFeatured(@Param('id') id: string): Promise<Response> {
    return this.coursesService.setFeatured(id);
  }

  //!   *******************************************
  //!  MANAGE TEACHERS IN COURSES
  //!   *******************************************

  //***** Get teachers by course *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get teachers by course' })
  @Get('teachers/:id')
  async getTeachersByCourseId(@Param('id') id: string): Promise<User[]> {
    return this.coursesService.getTeachersByCourseId(id);
  }

  //***** Add teacher to a course *****//
  //! Only admin
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add teacher to a course',
    description: 'Only admin',
  })
  @Put('teacher/add')
  async addTeacherToCourse(
    @Body() addTeacherDto: AddTeacherDto,
  ): Promise<Response> {
    return this.coursesService.addTeacherToCourse(addTeacherDto);
  }

  //***** Remove teacher from a course *****//
  //! Only admin
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove teacher', description: 'Only admin' })
  @Delete('teacher/remove')
  async removeTeacherFromCourse(
    @Body() addTeacherDto: AddTeacherDto,
  ): Promise<Response> {
    return this.coursesService.removeTeacherFromCourse(addTeacherDto);
  }

  //!   *******************************************
  //!  MANAGE USERS IN COURSES
  //!   *******************************************

  //***** Get users by course *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users by course' })
  @Get('users/:id')
  async getUsersByCourseId(@Param('id') id: string): Promise<User[]> {
    return this.coursesService.getUsersByCourseId(id);
  }

  //***** Add user to a course *****//
  //! Only Admin
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add user to a course', description: 'Only admin' })
  @Put('user/add')
  async addUserToCourse(@Body() addUserDto: AddUserDto): Promise<Response> {
    return this.coursesService.addUserToCourse(addUserDto);
  }

  //***** Remove user from a course *****//
  //! Only Admin
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remove user from a course',
    description: 'Only admin',
  })
  @Delete('user/remove')
  async removeUserFromCourse(
    @Body() addUserDto: AddUserDto,
  ): Promise<Response> {
    return this.coursesService.removeUserFromCourse(addUserDto);
  }
}
function id(id: any) {
  throw new Error('Function not implemented.');
}
