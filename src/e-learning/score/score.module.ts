import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from '../courses/courses.module';
import { QuizModule } from '../quizes/quiz.module';
import { ScoreController } from './controllers/score.controller';
import { Score } from './models/score.model';
import { ScoreRepository } from './repository/score.repository';
import { ScoreService } from './services/score.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score, ScoreRepository]),
    UsersModule,
    CoursesModule,
    QuizModule,
  ],
  controllers: [ScoreController],
  providers: [ScoreService],
  exports: [],
})
export class ScoreModule {}
