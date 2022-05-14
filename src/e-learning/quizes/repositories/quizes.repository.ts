import { Section } from 'src/e-learning/sections/models/section.model';
import { EntityRepository, Repository } from 'typeorm';
import { CreateQuizDto } from '../dtos';
import { Quiz } from '../models/quiz.model';

@EntityRepository(Quiz)
export class QuizRepository extends Repository<Quiz> {
  //***** Create a quiz *****/s/
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
        throw new Error('El quiz ya existe');
      }
      if (error.code === '22P02') {
        throw new Error('El quiz no tiene un formato correcto');
      }
      throw new Error('Error al crear el quiz');
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
}
