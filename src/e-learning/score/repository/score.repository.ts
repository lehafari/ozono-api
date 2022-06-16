import { User } from 'src/users/models/user.model';
import { EntityRepository, Repository } from 'typeorm';
import { CreateScoreDto } from '../dtos';
import { Status } from '../enum/status.enum';
import { Score } from '../models/score.model';

@EntityRepository(Score)
export class ScoreRepository extends Repository<Score> {
  //***** Create score for a quiz and a user in a course ******//
  async createScore(
    user: User,
    courseId: string,
    quizId: string,
    score: number,
    status: Status,
  ): Promise<Score> {
    const scoreAlreadyExists = await this.findOne({
      where: {
        userId: user.id,
        courseId,
        quizId,
      },
    });

    if (scoreAlreadyExists) {
      const updatedScore = await this.updateScore(
        user.id,
        courseId,
        quizId,
        score,
        status,
      );
      return updatedScore;
    }
    const newScore = new Score();
    newScore.user = user;
    newScore.courseId = courseId;
    newScore.quizId = quizId;
    newScore.score = score;
    newScore.status = status;
    return await this.save(newScore);
  }

  //******  find score by userId, courseId and quizId *****//
  async findScoreByUserIdCourseIdQuizId(
    userId: string,
    courseId: string,
    quizId: string,
  ): Promise<Score> {
    return await this.findOne({
      where: {
        userId,
        courseId,
        quizId,
      },
    });
  }

  //*****  update score  *****//
  async updateScore(
    userId: string,
    courseId: string,
    quizId: string,
    newScore: number,
    status: Status,
  ) {
    const score = await this.findScoreByUserIdCourseIdQuizId(
      userId,
      courseId,
      quizId,
    );
    if (!score) {
      throw new Error('No existe el score');
    }
    score.score = newScore;
    score.status = status;
    return await this.save(score);
  }

  //*****  find score by userId and courseId *****//
  // async findScoreByUserIdCourseId(
  //   userId: string,
  //   courseId: string,
  // ): Promise<Score[]> {
  //   return await this.find({
  //     where: {
  //       userId,
  //       courseId,
  //     },
  //   });
  // }
  async findScoreByUserIdCourseId(userId: string) {
    const user = await this.createQueryBuilder()
      .relation(Score, 'user')
      .of(userId)
      .loadOne();
    return user;
  }
}
