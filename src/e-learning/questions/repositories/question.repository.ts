import { EntityRepository, Repository } from 'typeorm';
import { Question } from '../models/question.model';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {}
{
}
