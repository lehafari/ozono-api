import { User } from 'src/users/models/user.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../enum/status.enum';

@Entity()
export class Score {
  // entity that will be related to the quiz table, user and course
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  score: number;

  @Column()
  userId: string;

  @Column()
  courseId: string;

  @Column()
  quizId: string;

  @Column()
  status: Status;

  @ManyToOne(() => User, (user) => user.scores, {
    onDelete: 'CASCADE',
  })
  user: User;
}
