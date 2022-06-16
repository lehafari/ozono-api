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
import { CreateQuestionsDto, UpdateQuestionsDto } from '../dtos';

import { QuestionsService } from '../services/questions.service';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  //****** Create a Question *****//
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

  //****** Find questions by quiz *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all questions by quiz' })
  @Get('find/:quizId')
  async findQuestionsByQuiz(@Param('quizId') quizId: string) {
    return this.questionService.getQuestionsByQuiz(quizId);
  }

  //*****  Find all questions and options *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all questions and options' })
  @Get('findAll/:quizId')
  async findAllQuestionsAndOptions(@Param('quizId') quizId: string) {
    return await this.questionService.getAllQuestionsAndOptions(quizId);
  }

  //****** Update question *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Update question' })
  @ApiBearerAuth()
  @Put('update/:questionId')
  async updateQuestion(
    @Param('questionId') questionId: string,
    @Body() updateQuestionDto: UpdateQuestionsDto,
  ) {
    return this.questionService.updateQuestion(questionId, updateQuestionDto);
  }

  //****** Delete question by id *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Delete a question' })
  @ApiBearerAuth()
  @Delete('delete/:questionId')
  async deleteQuestion(@Param('questionId') questionId: string) {
    return this.questionService.deleteQuestion(questionId);
  }
}
