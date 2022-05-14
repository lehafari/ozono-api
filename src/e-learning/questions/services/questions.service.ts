import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../repositories/question.repository';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  //***** Create question *****//
  async createQuestion() {}
}
