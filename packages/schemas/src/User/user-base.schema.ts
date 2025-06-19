import { z } from 'zod/v4';
import { userRoleSchema } from '../Auth/roles.schema';
import { permissionsArraySchema } from '../Auth/permissions.schema';

export const baseUserSchema = z
  .object({
    id: z.cuid2(),
    name: z.string().min(1, 'Name is required'),
    email: z.email('Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    role: userRoleSchema,
    permissions: permissionsArraySchema.optional(),
  })
  .strict();

export type BaseUserDto = z.infer<typeof baseUserSchema>;
