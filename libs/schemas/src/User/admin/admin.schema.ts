import { baseUserSchema } from '../base/base-user.schema';
import { z } from 'zod';
import { UserRole } from '@obg/enums';

export const adminUserSchema = baseUserSchema
  .extend({
    role: z.literal(UserRole.ADMIN),
  })
  .strict();

export const createAdminUserSchema = adminUserSchema.omit({ id: true });
export const updateAdminUserSchema = adminUserSchema
  .partial()
  .omit({ id: true });