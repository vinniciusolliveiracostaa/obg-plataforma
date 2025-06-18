import { z } from 'zod';
import { userRoleSchema } from './user-role.schema';
import { permissionsListSchema } from '../../Auth/permissions.schema';

export const baseUserSchema = z
  .object({
    id: z.string().cuid(),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    role: userRoleSchema,
    permissions: permissionsListSchema.optional(),
  })
  .strict();

export type BaseUserDto = z.infer<typeof baseUserSchema>;