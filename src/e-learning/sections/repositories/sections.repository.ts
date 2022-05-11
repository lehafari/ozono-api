import { Course } from 'src/e-learning/courses/models/course.model';
import { CoursesRepository } from 'src/e-learning/courses/repositories/courses.repository';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSectionDto } from '../dtos';
import { Section } from '../models/section.model';

@EntityRepository(Section)
export class SectionRepository extends Repository<Section> {
  async createSection(section: CreateSectionDto, course: Course) {
    const newSection = new Section();
    newSection.name = section.name;
    newSection.description = section.description;
    newSection.course = course;
    await this.save(newSection);
    return newSection;
  }

  async findSectionByCourse(courseId: string): Promise<Section[]> {
    return await this.find({
      where: {
        course: {
          id: courseId,
        },
      },
    });
  }
}
