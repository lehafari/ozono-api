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

  async createQuiz(createQuizDto: CreateQuizDto, sectionId: string) {
    const section = await this.sectionService.findSectionById(sectionId);
    return this.quizRepository.createQuiz(createQuizDto, section);
  }

  async getQuizById(quizId: string) {
    return this.quizRepository.findOne(quizId);
  }
}
