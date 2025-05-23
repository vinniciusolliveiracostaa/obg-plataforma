import { z } from 'zod';
import { UserRole } from '@obg/enums';

export const userRoleSchema = z.nativeEnum(UserRole);

export const userRoleList = Object.values(UserRole);