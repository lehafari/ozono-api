import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { Course } from 'src/e-learning/courses/models/course.model';
import { CoursesRepository } from 'src/e-learning/courses/repositories/courses.repository';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSectionDto, UpdateSectionDto } from '../dtos';
import { Section } from '../models/section.model';

@EntityRepository(Section)
export class SectionRepository extends Repository<Section> {
  //***** Create a section *****//
  async createSection(section: CreateSectionDto, course: Course) {
    const newSection = new Section();
    newSection.name = section.name;

    newSection.course = course;
    await this.save(newSection);
    return newSection;
  }

  //***** Find section by course *****//
  async findSectionByCourse(courseId: string): Promise<Section[]> {
    return await this.find({
      where: {
        course: {
          id: courseId,
        },
      },
    });
  }

  //***** Update a section *****//
  async updateSection(id: string, section: UpdateSectionDto) {
    try {
      const updateSection = await this.createQueryBuilder()
        .update(Section)
        .set(section)
        .where('id = :id', { id })
        .execute();
      if (!updateSection) {
        throw new ForbiddenException('La seccion no existe');
      }
      const response = {
        statusCode: HttpStatus.OK,
        message: 'Seccion actualizada con exito',
      };
      return response;
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('La seccion ya existe');
      }
    }
  }

  //***** Delete a section *****//
  async deleteSection(id: string) {
    const section = await this.findOne(id);
    if (!section) {
      throw new ForbiddenException('La seccion no existe');
    }
    const deleteSection = await this.createQueryBuilder()
      .delete()
      .from(Section)
      .where('id = :id', { id })
      .execute();
    if (!deleteSection) {
      throw new ForbiddenException('La seccion no existe');
    }
    const response = {
      statusCode: HttpStatus.OK,
      message: 'Seccion eliminada con exito',
    };
    return response;
  }
}
