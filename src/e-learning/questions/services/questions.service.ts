import { ForbiddenException, Injectable } from '@nestjs/common';
import { QuizService } from 'src/e-learning/quizes/services/quiz.service';
import { CreateQuestionsDto } from '../dtos/createQuestions.dto';
import { QuestionRepository } from '../repositories/question.repository';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly quizService: QuizService,
  ) {}

  //***** Create question *****//
  async createQuestion(createQuestionsDto: CreateQuestionsDto, quizId: string) {
    const quiz = await this.quizService.getQuizById(quizId);
    if (!quiz) {
      throw new ForbiddenException('El quiz no existe');
    }

    return this.questionRepository.createQuestion(createQuestionsDto, quiz);
  }
}
