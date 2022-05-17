import { ForbiddenException, Injectable } from '@nestjs/common';
import { QuestionsService } from 'src/e-learning/questions/services/questions.service';
import { CreateOptionDto } from '../dtos';
import { Option } from '../models/option.model';
import { OptionsRepository } from '../repositories/options.repository';

@Injectable()
export class OptionsService {
  constructor(
    private readonly optionsRepository: OptionsRepository,
    private readonly questionService: QuestionsService,
  ) {}

  //***** Create option *****//
  async createOption(
    option: CreateOptionDto,
    questionId: string,
  ): Promise<Option> {
    const question = await this.questionService.getQuestionById(questionId);
    if (!question) {
      throw new ForbiddenException('La pregunta no existe');
    }
    return await this.optionsRepository.createOption(option, question);
  }

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
}
