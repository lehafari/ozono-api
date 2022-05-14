import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsModule } from '../sections/sections.module';
import { QuizController } from './controllers/quizes.controller';
import { Quiz } from './models/quiz.model';
import { QuizRepository } from './repositories/quizes.repository';
import { QuizService } from './services/quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuizRepository, Quiz]), SectionsModule],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
