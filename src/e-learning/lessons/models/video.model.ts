import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseLesson } from './lesson.model';

@Entity()
export class LessonVideo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fieldname: string;

  @Column()
  originalname: string;

  @Column()
  encoding: string;

  @Column()
  mimetype: string;

  @Column()
  destination: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @Column()
  lesson: string;
}
