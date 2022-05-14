import { Injectable } from '@nestjs/common';
import { SectionsService } from 'src/e-learning/sections/services/sections.service';
import { CreateQuizDto } from '../dtos';
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
    return this.quizRepository.createQuiz(createQuizDto, section);
  }

  //***** Find quiz by id ******//
  async getQuizById(quizId: string) {
    return this.quizRepository.findOne(quizId);
  }

  //***** Find quiz by section *****//
  async getQuizBySection(sectionId: string) {
    const quizes = await this.quizRepository.findQuizBySection(sectionId);
    if (quizes.length === 0 || quizes === [] || quizes === null) {
      throw new Error('No hay Quizes para esta seccion');
    }
    return quizes;
  }
}