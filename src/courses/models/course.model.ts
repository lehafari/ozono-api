import { User } from 'src/users/models/user.model';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

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
  duration: number;

  @Column()
  category: string;

  @Column()
  level: string;

  @Column()
  status: boolean;

  @Column()
  premium: boolean;

  @Column({ nullable: true })
  premiumPrice: number;

  @Column()
  own: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToMany((type) => User, (user) => user.courses)
  users: User[];
}
