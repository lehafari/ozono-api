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

  //***** Find all questions by quiz *****//
  async getQuestionsByQuiz(quizId: string) {
    const question = await this.questionRepository.findQuestionsByQuiz(quizId);
    if (!question) {
      throw new ForbiddenException('No hay preguntas para este quiz');
    }
    return question;
  }

  //***** Find question by id *****//
  async getQuestionById(questionId: string) {
    const question = await this.questionRepository.findOne(questionId);
    if (!question) {
      throw new ForbiddenException('La pregunta no existe');
    }
    return question;
  }
}
