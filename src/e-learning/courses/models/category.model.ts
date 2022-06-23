import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.model';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  title: string;

  @ManyToMany((type) => Course, (course) => course.categories, {
    onDelete: 'CASCADE',
  })
  courses: Course[];
}
