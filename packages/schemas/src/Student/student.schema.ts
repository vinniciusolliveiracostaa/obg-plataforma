import {
  GenderEnum,
  LevelOfEducationEnum,
  RaceEnum,
  SpecialCategoriesEnum,
  UserRole,
} from '@obg/enums';
import { z } from 'zod/v4';
import { baseUserSchema } from '../User/user-base.schema';

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
    levelOfEducation: z.enum(LevelOfEducationEnum),
    gender: z.enum(GenderEnum),
    colorRace: z.enum(RaceEnum),
    specialCategories: z.array(z.enum(SpecialCategoriesEnum)).default([]),
    schoolId: z.cuid2(),
    teamId: z.cuid2(),
  })
  .strict();

export const createStudentSchema = studentUserSchema.omit({ id: true });
export const updateStudentSchema = studentUserSchema
  .partial()
  .extend({ role: z.literal(UserRole.STUDENT) })
  .omit({ id: true });

export type StudentDto = z.infer<typeof studentUserSchema>;
export type CreateStudentDto = z.infer<typeof createStudentSchema>;
export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;
