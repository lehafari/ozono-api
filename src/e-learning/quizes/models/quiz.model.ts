import { Question } from 'src/e-learning/questions/models/question.model';
import { Section } from 'src/e-learning/sections/models/section.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Section, (section) => section.quizes)
  section: Section;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
