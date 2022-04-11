import { Module } from '@nestjs/common';
import { join } from 'path';
import config from './config';
import validationSchema from './validationSchema';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: join(__dirname, '../../.env'),
      load: [config],
      isGlobal: true,
      validationSchema: validationSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigModule {}
