import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../models/category.model';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {}
