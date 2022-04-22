import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import compression from 'compression';
import helmet from 'helmet';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { AllExceptionFilter } from './common/filters/httpExeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;

  //*****Compression config *****//
  app.use(compression());

  //***** Helmet *****//
  app.use(helmet());

  //***** Global filter *****//
  app.useGlobalFilters(new AllExceptionFilter());

  //***** Global interceptor *****//
  app.useGlobalInterceptors(new TimeoutInterceptor());

  //*****Swagger config *****//
  const swagger = new DocumentBuilder()
    .setTitle('Ozono-api')
    .setDescription('Ozono endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  // Definimos la documentacion en la ruta /api
  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });

  //***** Cors Enabled *****//
  app.enableCors();

  //*****ValidationPipe config *****/
  app.useGlobalPipes(new ValidationPipe());

  //! start app //
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger running on http://localhost:${port}/api`);
}
bootstrap();
