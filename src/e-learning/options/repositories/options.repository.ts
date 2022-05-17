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
}
