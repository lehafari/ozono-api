import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titularName: string;

  @Column()
  bank: string;

  @Column()
  document: string;

  @Column()
  accountType: string;

  @Column()
  accountNumber: string;

  @Column()
  phone: string;

  @Column()
  address: string;
}
