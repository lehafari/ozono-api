import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { Roles } from 'src/users/enum/roles.enum';
import { CreateSectionDto, UpdateSectionDto } from '../dtos';
import { SectionsService } from '../services/sections.service';

@ApiTags('sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  //***** Create a section ******//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Create a section' })
  @ApiBody({ type: CreateSectionDto })
  @ApiBearerAuth()
  @Put('/create/:courseId')
  async createSection(
    @Body() createSectionDto: CreateSectionDto,
    @Param('courseId') courseId: string,
  ) {
    return await this.sectionsService.createSection(createSectionDto, courseId);
  }

  //***** Find section by course *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Get sections by course' })
  @ApiBearerAuth()
  @Get('/:courseId')
  async findSectionByCourse(@Param('courseId') courseId: string) {
    return await this.sectionsService.findSectionByCourse(courseId);
  }

  //***** Find section by lesson ******//
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get section by lesson' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('findBylesson/:sectionId')
  async findSectionByLesson(@Param('sectionId') sectionId: string) {
    return await this.sectionsService.findSectionByLesson(sectionId);
  }

  //***** Update section *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Update section' })
  @ApiBearerAuth()
  @Put('update/:sectionId')
  async updateSection(
    @Param('sectionId') sectionId: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return await this.sectionsService.updateSection(
      sectionId,
      updateSectionDto,
    );
  }

  //***** Delete section by id *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Delete a section' })
  @ApiBearerAuth()
  @Delete('/delete/:sectionId')
  async deleteSection(@Param('sectionId') sectionId: string) {
    return await this.sectionsService.deleteSection(sectionId);
  }
}
