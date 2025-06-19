import { z } from 'zod/v4';
import { permissionsArraySchema } from './permissions.schema';
import { userRoleSchema } from './roles.schema';

export const authRegisterSchema = z.object({
  id: z.cuid2(),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: userRoleSchema,
  permissions: permissionsArraySchema.optional(),
});

export type AuthRegisterDto = z.infer<typeof authRegisterSchema>;
