import { genSaltSync, hashSync } from 'bcryptjs';
import argon2 from 'argon2';
import { Exclude } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity()
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // @Column()
  // brithDate: Date;

  @Column()
  gender: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  ci: string;

  @Column({ default: false })
  image: string;

  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // @Column({ enum: Roles, default: Roles.USER })
  // role: Roles;
}
