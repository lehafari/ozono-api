import {
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto, DeleteCategories } from '../dtos';
import { Category } from '../models/category.model';
import { CategoriesRepository } from '../repositories/categories.repository';
import { Response } from '../types';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  //***** Create Category ******//
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      const categoryEntity = await this.categoriesRepository.create(
        createCategoryDto,
      );
      await this.categoriesRepository.save(categoryEntity);
      console.log(categoryEntity);
      return categoryEntity;
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

  //***** Delete categories ******//
  async deleteCategories(deleteCategories: string[]) {
    try {
      const categories = await this.categoriesRepository.findByIds(
        deleteCategories,
      );
      if (categories.length !== deleteCategories.length) {
        throw new ForbiddenException('Alguna categoría no existe');
      }
      categories.forEach(async (category) => {
        await this.categoriesRepository.delete(category.id);
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Categorias eliminadas',
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}

// try {
//   const categories = await this.categoriesRepository.find();
//   const categoriesToDelete = categories.filter(
//     (category) =>
//       deleteCategories.ids.find(
//         (id) => id.id === category.id && id.title === category.title,
//       ) !== undefined,
//   );
//   if (categoriesToDelete.length === 0) {
//     throw new ForbiddenException('No existen categorias para eliminar');
//   }
//   console.log(categoriesToDelete);
//   categoriesToDelete.forEach(async (category) => {
//     await this.categoriesRepository.delete(category.id);
//   });
//   return {
//     statusCode: HttpStatus.OK,
//     message: 'Categorias eliminadas',
//   };
// } catch (error) {
//   throw new ForbiddenException(error.message);
// }
