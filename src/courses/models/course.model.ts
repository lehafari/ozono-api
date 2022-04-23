import { User } from 'src/users/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Boolean, Level, Status } from '../enum';

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany((type) => User, (user) => user.courses)
  @JoinTable()
  users: User[];

  @ManyToMany((type) => User, (user) => user.courses)
  @JoinTable()
  teachers: User[];
}
