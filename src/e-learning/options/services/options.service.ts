import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from '../dtos';
import { Option } from '../models/option.model';
import { OptionsRepository } from '../repositories/options.repository';

@Injectable()
export class OptionsService {
  constructor(private readonly optionsRepository: OptionsRepository) {}

  //***** Create option *****//
  async createOption(
    option: CreateOptionDto,
    questionId: string,
  ): Promise<Option> {
    return await this.optionsRepository.createOption(option, questionId);
  }
}
