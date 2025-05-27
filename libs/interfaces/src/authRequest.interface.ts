import { Request } from 'express';
import { BaseUserDto } from '@obg/schemas';

export interface AuthRequest extends Request {
  user: BaseUserDto;
}