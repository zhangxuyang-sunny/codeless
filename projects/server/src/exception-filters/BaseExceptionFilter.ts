import { Response, Request } from "express";
import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { BaseException } from "./BaseException";

/**
 * 异常基础类过滤器
 *
 * @export
 * @class BaseExceptionFilter
 * @implements {ExceptionFilter<BaseException>}
 */
export abstract class BaseExceptionFilter implements ExceptionFilter<BaseException> {
  /**
   * 异常类捕获
   */
  abstract catch(exception: BaseException, host: ArgumentsHost): unknown;

  /**
   * 获取http请求上下文参数
   */
  protected getHttpContext(host: ArgumentsHost) {
    return host.switchToHttp();
  }

  /**
   * 获取http 响应参数
   */
  protected getResponse(httpContext: HttpArgumentsHost): Response {
    return httpContext.getResponse<Response>();
  }

  /**
   * 获取http请求参数
   */
  protected getRequest(httpContext: HttpArgumentsHost): Request {
    return httpContext.getRequest<Request>();
  }

  /**
   * 写入异常信息到客户端
   */
  protected writeToClient(host: ArgumentsHost, exception: BaseException) {
    const ctx = this.getHttpContext(host);
    if (exception instanceof BaseException) {
      this.getResponse(ctx)
        .status(exception.statusCode)
        .json({
          exceptionCode: exception.getExceptionCode(),
          message: exception.getErrorMessage(),
          path: this.getRequest(ctx).url
        });
    } else {
      const httpException = exception;
      this.getResponse(ctx)
        .status(500)
        .json({
          message: "未处理的异常",
          path: this.getRequest(ctx).url
        });
    }
  }
}
