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
import { CreateQuizDto } from '../dtos';
import { QuizService } from '../services/quiz.service';

@ApiTags('quizes')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  //***** Create a quiz  *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a quiz' })
  @Put('/create/:sectionId')
  async createQuiz(
    @Body() createQuizDto: CreateQuizDto,
    @Param('sectionId') sectionId: string,
  ) {
    console.log('body', createQuizDto);
    console.log('sectionId', sectionId);
    return await this.quizService.createQuiz(createQuizDto, sectionId);
  }

  //***** Find quiz by section *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get quizes by section ' })
  @Get('/:sectionId')
  async findQuizBySection(@Param('sectionId') sectionId: string) {
    return await this.quizService.getQuizBySection(sectionId);
  }

  //***** Update quiz *****//

  //***** Delete quiz by id *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Delete a quiz' })
  @ApiBearerAuth()
  @Delete('/delete/:quizId')
  async deleteQuiz(@Param('quizId') quizId: string) {
    return await this.quizService.deleteQuiz(quizId);
  }
}
