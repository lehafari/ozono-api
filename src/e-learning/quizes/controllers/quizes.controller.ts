import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { CreateQuizDto } from '../dtos';
import { QuizService } from '../services/quiz.service';

@ApiTags('quizes')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un quiz' })
  @Put('/create/:sectionId')
  async createQuiz(
    @Body() createQuizDto: CreateQuizDto,
    @Param('sectionId') sectionId: string,
  ) {
    console.log('body', createQuizDto);
    console.log('sectionId', sectionId);
    return await this.quizService.createQuiz(createQuizDto, sectionId);
  }
}
