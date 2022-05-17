import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { Question } from 'src/e-learning/questions/models/question.model';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOptionDto } from '../dtos';
import { Option } from '../models/option.model';

@EntityRepository(Option)
export class OptionsRepository extends Repository<Option> {
  //***** Create Option *****//
  async createOption(
    option: CreateOptionDto,
    question: Question,
  ): Promise<Option> {
    const newOption = this.create();
    newOption.option = option.option;
    newOption.question = question;
    return await this.save(newOption);
  }

  //***** Find options by question *****//
  async findOptionsByQuestion(questionId: string) {
    const options = await this.find({
      where: {
        question: {
          id: questionId,
        },
      },
    });
    return options;
  }

  //***** Delete a option *****//
  async deleteOption(id: string) {
    const option = await this.findOne(id);
    if (!option) {
      throw new ForbiddenException('La opcion no existe');
    }
    const deleteOption = await this.createQueryBuilder()
      .delete()
      .from(Option)
      .where('id = :id', { id })
      .execute();
    if (!deleteOption) {
      throw new ForbiddenException('Error al eliminar la opcion');
    }
    const response = {
      statusCode: HttpStatus.OK,
      message: 'Opcion eliminada con exito',
    };
    return response;
  }
}
