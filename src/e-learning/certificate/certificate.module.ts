import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from '../courses/courses.module';
import { QuizModule } from '../quizes/quiz.module';
import { ScoreModule } from '../score/score.module';
import { CertificateController } from './controllers/certificate.controller';
import { Certificate } from './models/certificate.model';
import { CertificateService } from './services/certificate.service';

@Module({
  imports: [
    ScoreModule,
    QuizModule,
    CoursesModule,
    UsersModule,
    TypeOrmModule.forFeature([Certificate]),
  ],
  controllers: [CertificateController],
  providers: [CertificateService],
  exports: [CertificateService],
})
export class CertificateModule {}
