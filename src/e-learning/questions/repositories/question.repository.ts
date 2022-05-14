import { Quiz } from 'src/e-learning/quizes/models/quiz.model';
import { EntityRepository, Repository } from 'typeorm';
import { CreateQuestionsDto } from '../dtos/createQuestions.dto';
import { Question } from '../models/question.model';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  async createQuestion(createQuestionsDto: CreateQuestionsDto, quiz: Quiz) {
    const question = new Question();
    question.question = createQuestionsDto.question;
    question.answer = createQuestionsDto.answer;
    question.type = createQuestionsDto.type;
    question.quiz = quiz;
    await this.save(question);
    return question;
  }
}
