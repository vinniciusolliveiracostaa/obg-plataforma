import { Request } from 'express';
import { UserSchemaType } from '@obg/schemas';

export interface AuthRequest extends Request {
  user: UserSchemaType;
}