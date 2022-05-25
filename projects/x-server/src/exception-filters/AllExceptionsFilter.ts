import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";

function isHttpException(exception: unknown): exception is HttpException {
  return exception instanceof HttpException;
}

function isError(exception: unknown): exception is Error {
  return exception instanceof Error;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = isHttpException(exception)
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const stack = isHttpException(exception)
      ? exception.message
      : isError(exception)
      ? exception.stack
      : null;

    const message = isHttpException(exception)
      ? exception.message
      : isError(exception)
      ? exception.message
      : "Internal server error";

    response.status(status).json({
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      message,
      stack
    });
  }
}
