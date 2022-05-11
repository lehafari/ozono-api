import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { Roles } from 'src/users/enum/roles.enum';
import { CreateSectionDto } from '../dtos';
import { Section } from '../models/section.model';
import { SectionsService } from '../services/sections.service';

@ApiTags('sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Create a section' })
  @ApiBody({ type: Section })
  @ApiBearerAuth()
  @Put('/create/:courseId')
  async createSection(
    @Body() section: CreateSectionDto,
    @Param('courseId') courseId: string,
  ) {
    console.log(section, courseId);
    return await this.sectionsService.createSection(section, courseId);
  }

  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Get sections by course' })
  @ApiBearerAuth()
  @Get('/:courseId')
  async findSectionByCourse(@Param('courseId') courseId: string) {
    return await this.sectionsService.findSectionByCourse(courseId);
  }
}
