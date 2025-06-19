import {
  GenderEnum,
  RaceEnum,
  SpecialCategoriesEnum,
  UserRole,
} from '@obg/enums';
import { z } from 'zod/v4';
import { baseUserSchema } from '../User/user-base.schema';

export const teacherUserSchema = baseUserSchema
  .extend({
    role: z.literal(UserRole.TEACHER),
    cpf: z.string().length(11, 'CPF must be at least 11 characters long'),
    phone: z.string().optional(),
    birthDate: z.preprocess((arg) => new Date(arg as string), z.date()),
    gender: z.enum(GenderEnum),
    colorRace: z.enum(RaceEnum),
    specialCategories: z.array(z.enum(SpecialCategoriesEnum)).default([]),
    schoolsId: z.array(z.cuid()).default([]),
    teamsId: z.cuid2().array().optional(),
  })
  .strict();

export const createTeacherSchema = teacherUserSchema.omit({ id: true });
export const updateTeacherSchema = teacherUserSchema
  .partial()
  .extend({ role: z.literal(UserRole.TEACHER) })
  .omit({ id: true });

export type TeacherDto = z.infer<typeof teacherUserSchema>;
export type CreateTeacherDto = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherDto = z.infer<typeof updateTeacherSchema>;
