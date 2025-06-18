import { UserRole } from '@obg/enums';

export interface UserFromJwt {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}