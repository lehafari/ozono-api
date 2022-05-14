import { User } from 'src/users/models/user.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.scores)
  user: User;
}
