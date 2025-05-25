import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@obg/enums';

export const ROLES_KEY = 'roles';
export const RequiredRoles = (...roles: UserRole[]) =>
  SetMetadata('roles', roles);

//decorator - javascript - design pattern
// - documentar algo
// - influenciar o comportamento de algo
