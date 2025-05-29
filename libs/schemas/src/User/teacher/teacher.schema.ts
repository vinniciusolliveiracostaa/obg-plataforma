import { baseUserSchema } from '../base/base-user.schema';
import { z } from 'zod';
import { UserRole } from '@obg/enums';

export const teacherUserSchema = baseUserSchema
  .extend({
    role: z.literal(UserRole.TEACHER),
    cpf: z.string().length(11, 'CPF must be at least 11 characters long'),
  })
  .strict();

export const createTeacherUserSchema = teacherUserSchema.omit({ id: true });
export const updateTeacherUserSchema = teacherUserSchema
  .partial()
  .omit({ id: true });

export type TeacherUserDto = z.infer<typeof teacherUserSchema>;
export type CreateTeacherUserDto = z.infer<typeof createTeacherUserSchema>;
export type UpdateTeacherUserDto = z.infer<typeof updateTeacherUserSchema>;

// Schema e tipo para input de criação de usuário
export const createTeacherUserInputSchema = createTeacherUserSchema.omit({
  role: true,
});
export type CreateTeacherUserInputDto = z.infer<
  typeof createTeacherUserInputSchema
>;

// Schema para e tipo input de atualização de usuário
export const updateTeacherUserInputSchema = updateTeacherUserSchema.omit({
  role: true,
});
export type UpdateTeacherUserInputDto = z.infer<
  typeof updateTeacherUserInputSchema
>;