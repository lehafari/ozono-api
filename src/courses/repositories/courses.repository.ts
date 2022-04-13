import { EntityRepository, Repository } from 'typeorm';
import { Course } from '../models/course.model';

@EntityRepository(Course)
export class CoursesRepository extends Repository<Course> {}
