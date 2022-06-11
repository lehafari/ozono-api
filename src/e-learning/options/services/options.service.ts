import { ForbiddenException, Injectable } from '@nestjs/common';
import { Question } from 'src/e-learning/questions/models/question.model';
import { QuestionsService } from 'src/e-learning/questions/services/questions.service';
import { CreateOptionDto, UpdateOptionDto } from '../dtos';
import { Option } from '../models/option.model';
import { OptionsRepository } from '../repositories/options.repository';

@Injectable()
export class OptionsService {
  constructor(private readonly optionsRepository: OptionsRepository) {}

  //***** Create Many Options ******//
  async createManyOptions(options: CreateOptionDto[], question: Question) {
    const createdOptions = await this.optionsRepository.createManyOptions(
      options,
      question,
    );
    return createdOptions;
    console.log(options);
  }

  //***** Create option *****//
  // async createOption(
  //   option: CreateOptionDto,
  //   questionId: string,
  // ): Promise<Option> {
  //   const question = await this.questionService.getQuestionById(questionId);
  //   if (!question) {
  //     throw new ForbiddenException('La pregunta no existe');
  //   }
  //   return await this.optionsRepository.createOption(option, question);
  // }

  //***** Find options by question *****//
  async findOptionsByQuestion(questionId: string) {
    const options = await this.optionsRepository.findOptionsByQuestion(
      questionId,
    );
    if (options.length === 0 || options === [] || options === null) {
      throw new Error('No hay opciones para esta pregunta');
    }
    return options;
  }

  //***** Find option by id *****//
  async findOptionById(optionId: string) {
    return this.optionsRepository.findOne(optionId);
  }

  //***** Update a option *****//
  async updateOption(optionId: string, option: UpdateOptionDto) {
    const updatedOption = await this.optionsRepository.updateOption(
      optionId,
      option,
    );
    if (!updatedOption) {
      throw new ForbiddenException('La opcion no existe');
    }
    return updatedOption;
  }

  //***** Delete a option *****//
  async deleteOption(optionId: string) {
    return await this.optionsRepository.deleteOption(optionId);
  }
}
