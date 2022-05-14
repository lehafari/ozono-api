import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { Roles } from 'src/users/enum/roles.enum';
import { CreateOptionDto } from '../dtos';
import { Option } from '../models/option.model';
import { OptionsService } from '../services/options.service';

@ApiTags('options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  //***** Create option *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create option' })
  @Put('create/:quizId')
  async createOption(
    @Body() option: CreateOptionDto,
    @Param('questionId') questionId: string,
  ): Promise<Option> {
    return await this.optionsService.createOption(option, questionId);
  }
}
