import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { Section } from 'src/e-learning/sections/models/section.model';
import { EntityRepository, Repository } from 'typeorm';
import { CreateQuizDto, UpdateQuizDto } from '../dtos';
import { Quiz } from '../models/quiz.model';

@EntityRepository(Quiz)
export class QuizRepository extends Repository<Quiz> {
  //***** Create a quiz *****//
  async createQuiz(createQuizDto: CreateQuizDto, section: Section) {
    try {
      const quiz = new Quiz();
      quiz.name = createQuizDto.name;
      quiz.description = createQuizDto.description;
      quiz.duration = createQuizDto.duration;
      quiz.status = createQuizDto.status;
      quiz.section = section;
      await this.save(quiz);
      return quiz;
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('El quiz ya existe');
      }
      if (error.code === '22P02') {
        throw new ForbiddenException('El quiz no tiene un formato correcto');
      }
      throw new ForbiddenException('Error al crear el quiz');
    }
  }

  //***** Find quiz by section ******//
  async findQuizBySection(sectionId: string) {
    const quizes = await this.find({
      where: {
        section: {
          id: sectionId,
        },
      },
    });
    return quizes;
  }

  //***** Update a quiz *****//
  async updateQuiz(id: string, quiz: UpdateQuizDto) {
    try {
      const updateQuiz = await this.createQueryBuilder()
        .update(Quiz)
        .set(quiz)
        .where('id = :id', { id })
        .execute();
      if (!updateQuiz) {
        throw new ForbiddenException('El quiz no existe');
      }
      const updatedQuiz = await this.findOne(id);
      return updatedQuiz;
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('El quiz ya existe');
      }
      if (error.code === '22P02') {
        throw new ForbiddenException('El quiz no tiene un formato correcto');
      }
      throw new ForbiddenException('Error al actualizar el quiz');
    }
  }

  //***** Delete a quiz *****//
  async deleteQuiz(id: string) {
    const quiz = await this.findOne(id);
    if (!quiz) {
      throw new ForbiddenException('El quiz no existe');
    }
    const deleteQuiz = await this.createQueryBuilder()
      .delete()
      .from(Quiz)
      .where('id = :id', { id })
      .execute();
    if (!deleteQuiz) {
      throw new ForbiddenException('Error al eliminar el quiz');
    }
    const response = {
      statusCode: HttpStatus.OK,
      message: 'Quiz eliminado con exito',
    };
    return response;
  }
}
