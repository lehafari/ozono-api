import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/auth/guards';

import { Roles } from 'src/users/enum/roles.enum';
import { CreateQuestionsDto } from '../dtos/createQuestions.dto';
import { QuestionsService } from '../services/questions.service';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a question' })
  @Put('create/:quizId')
  async createQuestion(
    @Body() createQuestionsDto: CreateQuestionsDto,
    @Param('quizId') quizId: string,
  ) {
    return this.questionService.createQuestion(createQuestionsDto, quizId);
  }
}