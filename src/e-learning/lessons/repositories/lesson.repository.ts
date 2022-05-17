import { ForbiddenException } from '@nestjs/common';
import { Section } from 'src/e-learning/sections/models/section.model';
import { Entity, EntityRepository, Repository } from 'typeorm';
import { CreateLessonDto } from '../dtos';
import { Lesson } from '../models/lesson.model';

@EntityRepository(Lesson)
export class LessonRepository extends Repository<Lesson> {
  //***** Create a lesson *****//
  async createLesson(lesson: CreateLessonDto, section: Section) {
    try {
      const lessonEntity = new Lesson();
      lessonEntity.name = lesson.name;
      lessonEntity.description = lesson.description;
      lessonEntity.duration = lesson.duration;
      lessonEntity.order = lesson.order;
      lessonEntity.section = section;
      await this.save(lessonEntity);
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('La leccion ya existe');
      }
      if (error.code === '22P02') {
        throw new ForbiddenException('La leccion no tiene un formato correcto');
      }
      throw new ForbiddenException('Error al crear la leccion');
    }
  }

  //***** Find lesson by section ******//
  async findLessonBySection(sectionId: string) {
    const lessons = await this.find({
      where: {
        section: {
          id: sectionId,
        },
      },
    });
    return lessons;
  }
}
