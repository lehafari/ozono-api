import { EntityRepository, Repository } from 'typeorm';
import { CreateOptionDto } from '../dtos';
import { Option } from '../models/option.model';

@EntityRepository(Option)
export class OptionsRepository extends Repository<Option> {
  //***** Create Option *****//
  async createOption(
    option: CreateOptionDto,
    questionId: string,
  ): Promise<Option> {
    const newOption = this.create();
    newOption.option = option.option;
    return await this.save(newOption);
  }
}
