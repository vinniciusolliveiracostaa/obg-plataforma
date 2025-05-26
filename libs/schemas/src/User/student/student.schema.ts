import { z } from 'zod';
import { UserRole } from '@obg/enums';
import { baseUserSchema } from '../base/base-user.schema';

export const studentUserSchema = baseUserSchema
  .extend({
    role: z.literal(UserRole.STUDENT),
    cpf: z.string().length(11, 'CPF must be at least 11 characters long'),
  })
  .strict();

export const createStudentUserSchema = studentUserSchema.omit({ id: true });
export const updateStudentUserSchema = studentUserSchema
  .partial()
  .omit({ id: true });