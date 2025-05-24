import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '@obg/interfaces';
import { UserSchemaType } from '@obg/schemas';

export const CurrentUSer = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserSchemaType => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);