import { Injectable } from '@nestjs/common';
import { CoursesService } from 'src/e-learning/courses/services/courses.service';
import { QuizService } from 'src/e-learning/quizes/services/quiz.service';
import { UsersService } from 'src/users/services/users.service';
import { CreateScoreDto, CreateScoreWithUserIdDto } from '../dtos';
import { ScoreRepository } from '../repository/score.repository';

@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepository: ScoreRepository,
    private readonly userService: UsersService,
    private readonly courseService: CoursesService,
    private readonly quizService: QuizService,
  ) {}

  //***** SET USER SCORE  ******//
  async createScore(userId: string, createScoreDto: CreateScoreDto) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new Error('No existe el usuario');
    }
    const course = await this.courseService.getCourseById(
      createScoreDto.courseId,
    );
    if (!course) {
      throw new Error('No existe el curso');
    }
    const quiz = await this.quizService.getQuizById(createScoreDto.quizId);
    if (!quiz) {
      throw new Error('No existe el quiz');
    }
    const scoreAlreadyExists = await this.scoreRepository.findOne({
      where: {
        userId,
        quizId: createScoreDto.quizId,
      },
    });
    console.log('score: ', scoreAlreadyExists);
    if (scoreAlreadyExists) {
      // update score
      return await this.scoreRepository.updateScore(
        userId,
        createScoreDto.courseId,
        createScoreDto.quizId,
        createScoreDto.score,
      );
    }
    return await this.scoreRepository.createScore(user, createScoreDto);
  }

  //***** ADMIN SET USER SCORE  ******//
  async createScoreWithUser(createScoreWithUserId: CreateScoreWithUserIdDto) {
    const user = await this.userService.findById(createScoreWithUserId.userId);
    if (!user) {
      throw new Error('No existe el usuario');
    }
    const course = await this.courseService.getCourseById(
      createScoreWithUserId.courseId,
    );
    if (!course) {
      throw new Error('No existe el curso');
    }
    const quiz = await this.quizService.getQuizById(
      createScoreWithUserId.quizId,
    );
    if (!quiz) {
      throw new Error('No existe el quiz');
    }
    return await this.scoreRepository.createScore(user, createScoreWithUserId);
  }
}
