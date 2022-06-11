import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { Question } from 'src/e-learning/questions/models/question.model';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOptionDto, UpdateOptionDto } from '../dtos';
import { Option } from '../models/option.model';

@EntityRepository(Option)
export class OptionsRepository extends Repository<Option> {
  //***** Create Many Options *****//
  async createManyOptions(options: CreateOptionDto[], question: Question) {
    const newOptions = options.map(async (option, i) => {
      console.log(option);
      try {
        const newOption = this.create();
        newOption.question = question;
        newOption.title = option.title;
        newOption.isCorrect = option.isCorrect;
        console.log('new option dentro del map', newOption);
        console.log('index', i);
        await this.save(newOption);
      } catch (error) {
        if (error.code === '23505') {
          throw new ForbiddenException('La opcion no existe');
        }
        if (error.code === '22P02') {
          throw new ForbiddenException(
            'La opcion no tiene un formato correcto',
          );
        }
        throw new ForbiddenException('Error al crear la opcion');
      }
    });

    return 'ok';
  }

  //***** Create Option *****//
  async createOption(
    option: CreateOptionDto,
    question: Question,
  ): Promise<Option> {
    const newOption = this.create();
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

  //***** Update a option *****//
  async updateOption(id: string, option: UpdateOptionDto) {
    try {
      const updateOption = await this.createQueryBuilder()
        .update(Option)
        .set(option)
        .where('id = :id', { id })
        .execute();
      if (!updateOption) {
        throw new ForbiddenException('La opcion no existe');
      }
      const updatedOption = await this.findOne(id);
      return updatedOption;
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('La opcion no existe');
      }
      if (error.code === '22P02') {
        throw new ForbiddenException('La opcion no tiene un formato correcto');
      }
      throw new ForbiddenException('Error al actualizar la opcion');
    }
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
