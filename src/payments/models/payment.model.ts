import { User } from 'src/users/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { paymentMethod } from '../enums';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  paymentMethod: paymentMethod;

  @Column({
    default: false,
  })
  paymentStatus: boolean;

  @Column()
  paymentReference: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
