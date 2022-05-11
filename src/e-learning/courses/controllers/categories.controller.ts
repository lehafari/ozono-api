import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { Roles } from 'src/users/enum/roles.enum';
import { CreateCategoryDto } from '../dtos';
import { DeleteCategories } from '../dtos/deleteCategories.dto';
import { CategoriesService } from '../services/categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //***** Create Category ******//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiOperation({ summary: 'Create category' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateCategoryDto })
  @Put('/create')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<any> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  //***** Get All Categories ******//
  @ApiOperation({ summary: 'Get all categories' })
  @Get('/all')
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  //***** Delete Category ******//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiOperation({ summary: 'Delete category' })
  @ApiBearerAuth()
  @Delete('/delete/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }

  //***** Delete categories ******//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiOperation({ summary: 'Delete many categories' })
  @ApiBearerAuth()
  @Delete('/delete-categories')
  async deleteCategories(@Body() ids: string[]) {
    return this.categoriesService.deleteCategories(ids);
  }
}
