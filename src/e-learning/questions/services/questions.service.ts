import { ForbiddenException, Injectable } from '@nestjs/common';
import { OptionsService } from 'src/e-learning/options/services/options.service';
import { QuizService } from 'src/e-learning/quizes/services/quiz.service';
import { UpdateQuestionsDto } from '../dtos';
import { CreateQuestionsDto } from '../dtos/createQuestions.dto';
import { QuestionRepository } from '../repositories/question.repository';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly quizService: QuizService,
    private readonly optionService: OptionsService,
  ) {}

  //***** Create question *****//
  async createQuestion(createQuestionsDto: CreateQuestionsDto, quizId: string) {
    const quiz = await this.quizService.getQuizById(quizId);
    if (!quiz) {
      throw new ForbiddenException('El quiz no existe');
    }
    const question = await this.questionRepository.createQuestion(
      createQuestionsDto,
      quiz,
    );
    if (!question) {
      throw new ForbiddenException('No se pudo crear la pregunta');
    }
    await this.optionService.createManyOptions(
      createQuestionsDto.options,
      question,
    );

    return {
      status: 'success',
      message: 'Pregunta creada correctamente',
    };
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

  //***** Update a question *****//
  async updateQuestion(questionId: string, question: UpdateQuestionsDto) {
    const updatedQuestion = await this.questionRepository.updateQuestion(
      questionId,
      question,
    );
    if (!updatedQuestion) {
      throw new ForbiddenException('La pregunta no existe');
    }
    return updatedQuestion;
  }

  //***** Delete a question *****//
  async deleteQuestion(questionId: string) {
    return await this.questionRepository.deleteQuestion(questionId);
  }
}
