import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [],
})
export class UploadModule {}
