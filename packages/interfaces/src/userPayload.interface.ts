import { UserRole } from '@obg/enums';

export interface UserPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}