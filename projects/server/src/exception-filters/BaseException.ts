import { HttpException } from "@nestjs/common";

/**
 * 定义基础异常类
 *
 * @export
 * @class BaseException
 * @extends {HttpException}
 */
export class BaseException extends HttpException {
  /**
   * Creates an instance of BaseException.
   * @param {number} exceptionCode 自定义异常编号
   * @param {string} errorMessage 提示信息
   * @param {number} statusCode 状态码
   * @memberof BaseException
   */
  constructor(
    public exceptionCode: number,
    public errorMessage: string,
    public statusCode: number
  ) {
    super({ exceptionCode, errorMessage }, statusCode);
  }

  /**
   * 获取自定义异常代码
   *
   * @return {*}
   * @memberof BaseException
   */
  getExceptionCode(): number {
    return this.exceptionCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }

  getStatusCode(): number {
    return this.statusCode;
  }
}
