import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { Quiz } from 'src/e-learning/quizes/models/quiz.model';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateQuestionsDto } from '../dtos';
import { CreateQuestionsDto } from '../dtos/createQuestions.dto';
import { Question } from '../models/question.model';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  //***** Create a question *****//
  async createQuestion(createQuestionsDto: CreateQuestionsDto, quiz: Quiz) {
    const question = new Question();
    question.question = createQuestionsDto.question;
    question.answer = createQuestionsDto.answer;
    question.type = createQuestionsDto.type;
    question.quiz = quiz;
    await this.save(question);
    return question;
  }

  //***** Find all questions by quiz *****//
  async findQuestionsByQuiz(quizId: string) {
    const questions = await this.find({
      where: {
        quiz: {
          id: quizId,
        },
      },
    });
    return questions;
  }

  //***** Update a question *****//
  async updateQuestion(id: string, question: UpdateQuestionsDto) {
    try {
      const updateQuestion = await this.createQueryBuilder()
        .update(Question)
        .set(question)
        .where('id = :id', { id })
        .execute();
      if (!updateQuestion) {
        throw new ForbiddenException('La pregunta no existe');
      }
      const response = {
        statusCode: HttpStatus.OK,
        message: 'Pregunta actualizada con exito',
      };
      return response;
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('La pregunta no existe');
      }
      if (error.code === '22P02') {
        throw new ForbiddenException(
          'La pregunta no tiene un formato correcto',
        );
      }
      throw new ForbiddenException('Error al actualizar la pregunta');
    }
  }

  //***** Delete a question *****//
  async deleteQuestion(id: string) {
    const question = await this.findOne(id);
    if (!question) {
      throw new ForbiddenException('La pregunta no existe');
    }
    const deleteQuestion = await this.createQueryBuilder()
      .delete()
      .from(Question)
      .where('id = :id', { id })
      .execute();

    if (!deleteQuestion) {
      throw new ForbiddenException('Error al eliminar la pregunta');
    }
    const response = {
      statusCode: HttpStatus.OK,
      message: 'Pregunta eliminada con exito',
    };
    return response;
  }
}
