import { EntityRepository, Repository } from 'typeorm';
import { Lesson } from '../models/lesson.model';

@EntityRepository()
export class LessonRepository extends Repository<Lesson> {}
