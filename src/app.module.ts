import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { CoursesModule } from './e-learning/courses/courses.module';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';
import { SectionsModule } from './e-learning/sections/sections.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    UploadModule,
    CoursesModule,
    SectionsModule,
  ],
})
export class AppModule {}
