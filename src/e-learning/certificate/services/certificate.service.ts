import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesService } from 'src/e-learning/courses/services/courses.service';
import { QuizService } from 'src/e-learning/quizes/services/quiz.service';
import { ScoreService } from 'src/e-learning/score/services/score.service';
import { MailsService } from 'src/mails/services/mails.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { Certificate } from '../models/certificate.model';

@Injectable()
export class CertificateService {
  constructor(
    private readonly quizService: QuizService,
    private readonly scoreService: ScoreService,
    private readonly userService: UsersService,
    private readonly mailService: MailsService,
    private readonly courseService: CoursesService,
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
  ) {}

  //*****  Get Certificate *****//
  async getCertificate(userId: string, courseId: string) {
    try {
      const quizzes = await this.quizService.getQuizByCourse(courseId);
      const scores = await this.scoreService.findScoresByUser(userId);
      const user = await this.userService.findById(userId);
      const course = await this.courseService.getCourseById(courseId);

      const filteredScores = scores.filter((score) => {
        return score.courseId === courseId;
      });
      const passedScores = filteredScores.filter((score) => {
        return score.status === 'APROBADO';
      });

      if (quizzes.length === passedScores.length) {
        const certificateExists = await this.certificateRepository.findOne({
          where: { userId, courseId },
        });
        if (!certificateExists) {
          const certificate = await this.certificateRepository.create({
            userId,
            courseId,
          });
          await this.certificateRepository.save(certificate);
          this.mailService.sendCertificateMail(user, course, certificate.id);

          await this.mailService.sendCertificateMail(
            user,
            course,
            certificate.id,
          );

          return {
            message: 'Certificado enviado, revisa tu correo',
          };
        }
        this.mailService.sendCertificateMail(
          user,
          course,
          certificateExists.id,
        );

        return {
          message: 'Certificado enviado, revisa tu correo',
        };
      } else {
        throw new ForbiddenException(
          'Tienes que aprobar todos los quizzes para obtener tu certificado',
        );
      }
    } catch (error) {
      throw new ForbiddenException(
        error.message || 'Error al procesar certificado',
      );
    }
  }
}
