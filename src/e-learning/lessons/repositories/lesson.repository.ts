import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { Section } from 'src/e-learning/sections/models/section.model';
import { Entity, EntityRepository, Repository } from 'typeorm';
import { CreateLessonDto, UpdateLessonDto } from '../dtos';
import { CourseLesson } from '../models/lesson.model';
import { videoFile } from '../types/video.type';

@EntityRepository(CourseLesson)
export class LessonRepository extends Repository<CourseLesson> {
  //***** Create a lesson *****//
  async createLesson(lesson: CreateLessonDto, section: Section) {
    try {
      console.log(lesson);
      const lessonEntity = new CourseLesson();
      lessonEntity.name = lesson.name;
      lessonEntity.description = lesson.description;
      lessonEntity.duration = lesson.duration;
      lessonEntity.section = section;
      await this.save(lessonEntity);
      return lessonEntity;
    } catch (error) {
      console.log(error);
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

  //***** Update a lesson *****//
  async updateLesson(id: string, lesson: UpdateLessonDto) {
    try {
      const updateLesson = await this.createQueryBuilder()
        .update(CourseLesson)
        .set(lesson)
        .where('id = :id', { id })
        .execute();
      if (!updateLesson) {
        throw new ForbiddenException('La leccion no existe');
      }
      const response = {
        statusCode: HttpStatus.OK,
        message: 'Leccion actualizada con exito',
      };
      return response;
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('La leccion no existe');
      }
      if (error.code === '22P02') {
        throw new ForbiddenException('La leccion no tiene un formato correcto');
      }
      throw new ForbiddenException('Error al crear la leccion');
    }
  }

  //***** Delete a lesson *****//
  async deleteLesson(id: string) {
    const quiz = await this.findOne(id);
    if (!quiz) {
      throw new ForbiddenException('La leccion no existe');
    }
    const deleteLesson = await this.createQueryBuilder()
      .delete()
      .from(CourseLesson)
      .where('id = :id', { id })
      .execute();
    if (!deleteLesson) {
      throw new ForbiddenException('La leccion no existe');
    }
    const response = {
      statusCode: HttpStatus.OK,
      message: 'Leccion eliminada con exito',
    };
    return response;
  }

  //! Upload files !//

  //**** Upload video *****//
  // async uploadVideo(lessonId: string, video: videoFile) {
  //   console.log(video);
  //   const response = await this.createQueryBuilder()
  //     .update(CourseLesson)
  //     .set({ videoUrl: video })
  //     .where('id = :id', { id: video.lesson })
  //     .execute();
  //   if (!response) {
  //     throw new ForbiddenException('La leccion no existe');
  //   }
  //   if (response) {
  //     return HttpStatus.OK;
  //   } else {
  //     throw new ForbiddenException('No se pudo actualizar el video');
  //   }
  // }
}
