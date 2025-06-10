import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(
    public readonly code: string,
    message: string,
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly metadata?: Record<string, any>,
  ) {
    super({ code, message, metadata }, status);
  }
}
