import { Question } from 'src/e-learning/questions/models/question.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  option: string;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;
}
