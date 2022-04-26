import {
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dtos';
import { CategoriesRepository } from '../repositories/categories.repository';
import { Response } from '../types';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  //***** Create Category ******//
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Response> {
    try {
      const categoryEntity = await this.categoriesRepository.create(
        createCategoryDto,
      );
      await this.categoriesRepository.save(categoryEntity);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Categoria creada',
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('La categoría ya existe');
      }
      throw new ForbiddenException(error.message);
    }
  }

  //***** Get All Categories ******//
  async getAllCategories() {
    try {
      const categories = await this.categoriesRepository.find();
      console.log(categories);
      return categories;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  //***** Delete Category ******//
  async deleteCategory(id: string) {
    try {
      const category = await this.categoriesRepository.findOne(id);
      if (!category) {
        throw new ForbiddenException('La categoría no existe');
      }
      await this.categoriesRepository.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Categoria eliminada',
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
