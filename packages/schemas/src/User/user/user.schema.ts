import { baseUserSchema } from '../base/base-user.schema';
import { UserRole } from '@obg/enums';
import { z } from 'zod';

export const userSchema = baseUserSchema
  .extend({
    role: z.literal(UserRole.USER),
  })
  .strict();

export const createUserSchema = userSchema.omit({ id: true });
export const updateUserSchema = userSchema.partial().omit({ id: true });
export const removeUserSchema = userSchema.pick({ id: true, role: true });
