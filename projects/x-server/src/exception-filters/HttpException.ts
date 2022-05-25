import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  Logger,
  HttpStatus
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const { message, name } = exception;
    console.log(exception.getResponse());
    if (message) {
      Logger.error(message, name);
    }

    response.status(status).header("Content-Type", "application/json; charset=utf-8").json({
      // ...exception.getResponse(),
      stack: exception.stack
    });
  }
}
