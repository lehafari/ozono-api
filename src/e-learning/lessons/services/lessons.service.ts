import { ForbiddenException, Injectable } from '@nestjs/common';
import { SectionsService } from 'src/e-learning/sections/services/sections.service';
import { CreateLessonDto } from '../dtos';
import { LessonRepository } from '../repositories/lesson.repository';
@Injectable()
export class LessonsService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly sectionService: SectionsService,
  ) {}

  //***** Create a lesson *****//
  async createLesson(lesson: CreateLessonDto, sectionId: string) {
    const section = await this.sectionService.findSectionById(sectionId);
    if (!section) {
      throw new ForbiddenException('No existe la seccion');
    }
    return this.lessonRepository.createLesson(lesson, section);
  }

  //***** Find lesson by id *****//
  async getLessonById(lessonId: string) {
    return this.lessonRepository.findOne(lessonId);
  }

  //***** Find lesson by section ******//
  async getLessonBySection(sectionId: string) {
    const lessons = await this.lessonRepository.findLessonBySection(sectionId);
    if (lessons.length === 0 || lessons === [] || lessons === null) {
      throw new Error('No hay Lecciones para esta seccion');
    }
    return lessons;
  }
}
