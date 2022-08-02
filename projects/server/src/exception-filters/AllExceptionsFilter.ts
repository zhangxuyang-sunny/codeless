import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from "@nestjs/common";

function isHttpException(exception: unknown): exception is HttpException {
  return exception instanceof HttpException;
}

function isError(exception: unknown): exception is Error {
  return exception instanceof Error;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger();
  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception, "error");
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = isHttpException(exception)
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isHttpException(exception)
      ? exception.getResponse()
      : isError(exception)
      ? exception.message
      : "Internal server error";

    const stack = isError(exception) ? exception.stack : null;

    response.status(status).json({
      path: request.url,
      timestamp: Date.now(),
      message,
      stack
    });
  }
}
