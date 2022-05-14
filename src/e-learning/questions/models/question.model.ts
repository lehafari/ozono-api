import { Option } from 'src/e-learning/options/models/option.model';
import { Quiz } from 'src/e-learning/quizes/models/quiz.model';

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  type: string;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
