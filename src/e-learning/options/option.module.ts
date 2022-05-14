import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from '../questions/question.module';
import { OptionsController } from './controllers/options.controller';
import { Option } from './models/option.model';
import { OptionsRepository } from './repositories/options.repository';
import { OptionsService } from './services/options.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Option, OptionsRepository]),
    QuestionModule,
  ],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
