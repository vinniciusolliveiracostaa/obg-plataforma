import { z } from 'zod';
import {
  GenderEnum,
  LevelOfEducationEnum,
  RaceEnum,
  UserRole,
} from '@obg/enums';
import { baseUserSchema } from '../base/base-user.schema';
import { specialCategoriesSchema } from '../special-categories.schema';

export const studentUserSchema = baseUserSchema
  .extend({
    role: z.literal(UserRole.STUDENT),
    cpf: z.string().length(11, 'CPF must be at least 11 characters long'),
    nis: z.string().optional(),
    motherName: z
      .string()
      .min(3, 'Mother name must be at least 3 characters long'),
    phone: z.string().optional(),
    birthDate: z.preprocess((arg) => new Date(arg as string), z.date()),
    levelOfEducation: z.nativeEnum(LevelOfEducationEnum),
    gender: z.nativeEnum(GenderEnum),
    colorRace: z.nativeEnum(RaceEnum),
    specialCategories: z.array(specialCategoriesSchema).default([]),
    schoolId: z.string().cuid(),
    teamId: z.string().cuid(),
  })
  .strict();

export const createStudentUserSchema = studentUserSchema.omit({ id: true });
export const updateStudentUserSchema = studentUserSchema
  .partial()
  .extend({ role: z.literal(UserRole.STUDENT) })
  .omit({ id: true });
export const removeStudentUserSchema = studentUserSchema.pick({
  id: true,
  role: true,
});

export type StudentUserDto = z.infer<typeof studentUserSchema>;
export type CreateStudentUserDto = z.infer<typeof createStudentUserSchema>;
export type UpdateStudentUserDto = z.infer<typeof updateStudentUserSchema>;
export type RemoveStudentUserDto = z.infer<typeof removeStudentUserSchema>;

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

// Schema para a resposta da API (lista de estudantes)
export const studentsResponseSchema = z.object({
  data: z.array(studentUserSchema),
  total: z.number(),
  totalPages: z.number(),
});
