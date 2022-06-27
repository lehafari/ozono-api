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
    const sections = await this.findSectionByCourse(course.id);
    const lastIndex = sections.length;
    newSection.index = lastIndex + 1;
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

  //***** Find section by index *****//
  async findSectionByIndex(index: number, courseId: string): Promise<Section> {
    const section = await this.createQueryBuilder('section')
      .leftJoinAndSelect('section.course', 'course')
      .where('section.index = :index', { index })
      .andWhere('course.id = :courseId', { courseId })
      .getOne();
    if (!section) {
      throw new ForbiddenException('La seccion no existe');
    }
    return section;
  }

  //***** Find section by lesson *****//
  async findSectionByLesson(lessonId: string): Promise<Section> {
    const section = await this.createQueryBuilder('section')
      .leftJoinAndSelect('section.lessons', 'lesson')
      .where('lesson.id = :lessonId', { lessonId })
      .getOne();
    if (!section) {
      throw new ForbiddenException('La seccion no existe');
    }
    return section;
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
      const updatedSection = await this.findOne(id);
      return updatedSection;
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('La seccion ya existe');
      }
      if (error.code === '22P02') {
        throw new ForbiddenException('La seccion no tiene un formato correcto');
      }
      throw new ForbiddenException('Error al actualizar la seccion');
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
