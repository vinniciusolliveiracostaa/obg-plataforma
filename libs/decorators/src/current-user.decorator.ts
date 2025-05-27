import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '@obg/interfaces';
import { BaseUserDto } from '@obg/schemas';

export const CurrentUSer = createParamDecorator(
  (data: unknown, context: ExecutionContext): BaseUserDto => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);