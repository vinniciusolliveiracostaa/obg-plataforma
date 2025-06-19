import { z } from 'zod/v4';
import { userRoleSchema } from './roles.schema';
import { permissionsArraySchema } from './permissions.schema';

export const safeUserSchema = z
  .object({
    id: z.string().cuid2(),
    email: z.string().email('Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    role: userRoleSchema,
    permissions: permissionsArraySchema.optional(),
  })
  .strict();

export type SafeUserDto = z.infer<typeof safeUserSchema>;
