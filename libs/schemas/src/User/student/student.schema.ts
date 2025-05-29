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

export type StudentUserDto = z.infer<typeof studentUserSchema>;
export type CreateStudentUserDto = z.infer<typeof createStudentUserSchema>;
export type UpdateStudentUserDto = z.infer<typeof updateStudentUserSchema>;

// Schema e tipo para input de criação de usuário
export const createStudentUserInputSchema = createStudentUserSchema.omit({
  role: true,
});
export type CreateStudentUserInputDto = z.infer<
  typeof createStudentUserInputSchema
>;

// Schema para e tipo input de atualização de usuário
export const updateStudentUserInputSchema = updateStudentUserSchema.omit({
  role: true,
});
export type UpdateStudentUserInputDto = z.infer<
  typeof updateStudentUserInputSchema
>;