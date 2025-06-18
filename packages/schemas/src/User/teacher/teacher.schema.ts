import { baseUserSchema } from '../base/base-user.schema';
import { z } from 'zod';
import { GenderEnum, RaceEnum, UserRole } from '@obg/enums';
import { specialCategoriesSchema } from '../special-categories.schema';

export const teacherUserSchema = baseUserSchema
  .extend({
    role: z.literal(UserRole.TEACHER),
    cpf: z.string().length(11, 'CPF must be at least 11 characters long'),
    phone: z.string().optional(),
    birthDate: z.preprocess((arg) => new Date(arg as string), z.date()),
    gender: z.nativeEnum(GenderEnum),
    colorRace: z.nativeEnum(RaceEnum),
    specialCategories: z.array(specialCategoriesSchema).default([]),
    schoolsId: z.array(z.string().cuid()).default([]),
    teamsId: z.string().cuid().array().optional(),
  })
  .strict();

export const createTeacherUserSchema = teacherUserSchema.omit({ id: true });
export const updateTeacherUserSchema = teacherUserSchema
  .partial()
  .extend({ role: z.literal(UserRole.TEACHER) })
  .omit({ id: true });
export const removeTeacherUserSchema = teacherUserSchema.pick({
  id: true,
  role: true,
});

export type TeacherUserDto = z.infer<typeof teacherUserSchema>;
export type CreateTeacherUserDto = z.infer<typeof createTeacherUserSchema>;
export type UpdateTeacherUserDto = z.infer<typeof updateTeacherUserSchema>;
export type RemoveTeacherUserDto = z.infer<typeof removeTeacherUserSchema>;

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
// Schema para a resposta da API (lista de professores)
export const teachersResponseSchema = z.object({
  data: z.array(teacherUserSchema),
  total: z.number(),
  totalPages: z.number(),
});
