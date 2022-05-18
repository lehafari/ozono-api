import { ForbiddenException, Injectable } from '@nestjs/common';
import fs from 'fs';
import { SectionsService } from 'src/e-learning/sections/services/sections.service';
import { CreateLessonDto } from '../dtos';
import { UpdateLessonDto } from '../dtos/updateLesson.dto';
import { LessonRepository } from '../repositories/lesson.repository';
import { VideoRepository } from '../repositories/video.repository';
@Injectable()
export class LessonsService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly videoRepository: VideoRepository,
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

  //***** Update a lesson *****//
  async updateLesson(lessonId: string, lesson: UpdateLessonDto) {
    const updatedLesson = await this.lessonRepository.updateLesson(
      lessonId,
      lesson,
    );
    if (!updatedLesson) {
      throw new ForbiddenException('La Leccion no existe');
    }
    return updatedLesson;
  }

  //***** Delete a lesson *****//
  async deleteLesson(lessonId: string) {
    return await this.lessonRepository.deleteLesson(lessonId);
  }

  //! Upload files !//

  //**** Upload video *****//
  async uploadVideo(lessonId: string, video: any) {
    const lesson = await this.lessonRepository.findOne(lessonId);
    if (!lesson) {
      throw new ForbiddenException('La Leccion no existe');
    }
    return this.videoRepository.createVideo(video, lesson.id);
  }

  //**** Find video by lesson *****//
  async getVideoByLesson(lessonId: string, res) {
    const lesson = await this.lessonRepository.findOne(lessonId);
    if (!lesson) {
      throw new ForbiddenException('La Leccion no existe');
    }
    const video = await this.videoRepository.getVideoByLesson(lesson.id);
    if (!video) {
      throw new Error('No hay videos para esta leccion');
    }
    if (!fs.existsSync(`files/lessons/${video.filename}`)) {
      throw new Error('El video no existe');
    }
    const videoFile = res.sendFile(video.filename, {
      root: `files/lessons/`,
    });
    return videoFile;
  }
}
