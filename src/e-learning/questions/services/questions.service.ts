import { Injectable } from '@nestjs/common';
import { CreateQuestionsDto } from '../dtos/createQuestions.dto';
import { QuestionRepository } from '../repositories/question.repository';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  //***** Create question *****//
  async createQuestion(
    createQuestionsDto: CreateQuestionsDto,
    quizId: string,
  ) {}
}
