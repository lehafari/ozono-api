import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { Roles } from 'src/users/enum/roles.enum';
import { CreateOptionDto, UpdateOptionDto } from '../dtos';
import { Option } from '../models/option.model';
import { OptionsService } from '../services/options.service';

@ApiTags('options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  //***** Create option *****//
  // @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Create option' })
  // @Put('create/:questionId')
  // async createOption(
  //   @Body() option: CreateOptionDto,
  //   @Param('questionId') questionId: string,
  // ): Promise<Option> {
  //   return await this.optionsService.createOption(option, questionId);
  // }

  //***** Find options by question *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find options by question' })
  @Get('find/:questionId')
  async findOptionsByQuestion(@Param('questionId') questionId: string) {
    return await this.optionsService.findOptionsByQuestion(questionId);
  }

  //***** Update option *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Delete a option' })
  @ApiBearerAuth()
  @Put('update/:optionId')
  async updateOption(
    @Param('optionId') optionId: string,
    @Body() option: UpdateOptionDto,
  ) {
    return await this.optionsService.updateOption(optionId, option);
  }

  //***** Delete option by id *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Delete option' })
  @ApiBearerAuth()
  @Delete('delete/:optionId')
  async deleteOption(@Param('optionId') optionId: string) {
    return await this.optionsService.deleteOption(optionId);
  }
}
