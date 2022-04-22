import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('AllExceptionFilter');
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const { statusCode, message, error } =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.logger.localInstance.debug(
      `Status: ${status}, Message: ${message}, Error: ${error}, URL: ${request.url}, Method: ${request.method}`,
    );

    response.status(status).json({
      statusCode,
      message,
      error,
    });
  }
}
