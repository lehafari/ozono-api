import { ForbiddenException, Injectable } from '@nestjs/common';
import { SectionsService } from 'src/e-learning/sections/services/sections.service';
import { CreateQuizDto, UpdateQuizDto } from '../dtos';
import { Quiz } from '../models/quiz.model';
import { QuizRepository } from '../repositories/quizes.repository';

@Injectable()
export class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly sectionService: SectionsService,
  ) {}

  //***** Create a Quiz *****//
  async createQuiz(createQuizDto: CreateQuizDto, sectionId: string) {
    const section = await this.sectionService.findSectionById(sectionId);
    if (!section) {
      throw new ForbiddenException('No existe la seccion');
    }
    return this.quizRepository.createQuiz(createQuizDto, section);
  }

  //***** Find quiz by id ******//
  async getQuizById(quizId: string) {
    return this.quizRepository.findOne(quizId);
  }

  //***** Find quizzes by course *****//
  async getQuizByCourse(courseId: string): Promise<string[]> {
    const sections = await this.sectionService.findSectionByCourse(courseId);
    const quizzes = await Promise.all(
      sections.map(async (section) => {
        return await this.quizRepository.findQuizBySection(section.id);
      }),
    );
    const quizzesIds = quizzes.map((section) => {
      const quizId = section.map((quiz) => {
        return quiz.id;
      });
      return quizId;
    });
    const quizzesIdsConcat = quizzesIds.reduce((a, b) => a.concat(b), []);
    return quizzesIdsConcat;
  }

  //***** Find quiz by section *****//
  async getQuizBySection(sectionId: string) {
    const quizes = await this.quizRepository.findQuizBySection(sectionId);
    if (quizes.length === 0 || quizes === [] || quizes === null) {
      throw new ForbiddenException('No hay Quizes para esta seccion');
    }
    return quizes;
  }

  //***** Update a quiz *****//
  async updateQuiz(quizId: string, quiz: UpdateQuizDto) {
    const updatedQuiz = await this.quizRepository.updateQuiz(quizId, quiz);
    if (!updatedQuiz) {
      throw new ForbiddenException('El Quiz no existe');
    }
    return updatedQuiz;
  }

  //***** Delete a quiz *****//
  async deleteQuiz(quizId: string) {
    return await this.quizRepository.deleteQuiz(quizId);
  }
}
