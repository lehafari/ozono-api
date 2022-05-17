import { Course } from 'src/e-learning/courses/models/course.model';
import { Lesson } from 'src/e-learning/lessons/models/lesson.model';
import { Quiz } from 'src/e-learning/quizes/models/quiz.model';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Course, (course) => course.sections)
  course: Course;

  @OneToMany(() => Quiz, (quiz) => quiz.section)
  quizes: Quiz[];

  @OneToMany(() => Lesson, (lesson) => lesson.section)
  lessons: Lesson[];
}
