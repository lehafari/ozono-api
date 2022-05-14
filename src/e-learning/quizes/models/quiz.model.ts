import { Section } from 'src/e-learning/sections/models/section.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  status: string;

  @ManyToOne(() => Section, (section) => section.quizes)
  section: Section;
}
