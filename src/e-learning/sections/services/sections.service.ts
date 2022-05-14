import { ForbiddenException, Injectable } from '@nestjs/common';
import { CoursesService } from 'src/e-learning/courses/services/courses.service';
import { CreateSectionDto } from '../dtos';
import { Section } from '../models/section.model';
import { SectionRepository } from '../repositories/sections.repository';

@Injectable()
export class SectionsService {
  constructor(
    private readonly coursesServices: CoursesService,
    private readonly sectionRepository: SectionRepository,
  ) {}

  async createSection(section: CreateSectionDto, courseId: string) {
    const course = await this.coursesServices.getCourseById(courseId);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    return await this.sectionRepository.createSection(section, course);
  }

  async findSectionByCourse(courseId: string): Promise<Section[]> {
    const sections = await this.sectionRepository.findSectionByCourse(courseId);
    if (sections.length === 0 || sections === [] || sections === null) {
      throw new ForbiddenException('No hay secciones para este curso');
    }
    return sections;
  }

  async findSectionById(sectionId: string): Promise<Section> {
    return await this.sectionRepository.findOne(sectionId);
  }

  async deleteSection(sectionId: string) {
    await this.sectionRepository.delete(sectionId);
    return { message: 'Seccion eliminada', status: 200 };
  }
}
