import { Section } from 'src/e-learning/sections/models/section.model';
import { User } from 'src/users/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Boolean, Level, Status } from '../enum';
import { Category } from './category.model';

@Entity()
@Unique(['title'])
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  duration: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  image: string;

  @Column({ enum: Level, default: Level.PRINCIPIANTE })
  level: Level;

  @Column({ enum: Status, default: Status.ACTIVE })
  status: Status;

  @Column({ enum: Boolean, default: Boolean.false })
  premium: Boolean;

  @Column({ nullable: true })
  premiumPrice: number;

  @Column({ enum: Boolean, default: Boolean.true })
  own: Boolean;

  @Column({ default: 0 })
  numberOfStudents: number;

  @Column({ default: false })
  featured: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany((type) => User, (user) => user.courses, { onDelete: 'CASCADE' })
  @JoinTable()
  users: User[];

  @ManyToMany((type) => User, (user) => user.courses, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'teacher_course' })
  teachers: User[];

  @ManyToMany((type) => Category, (category) => category.courses, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'category_course' })
  categories: Category[];

  @OneToMany(() => Section, (section) => section.course, {
    onDelete: 'CASCADE',
  })
  sections: Section[];
}
