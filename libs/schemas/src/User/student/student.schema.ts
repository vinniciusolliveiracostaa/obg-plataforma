import { z } from 'zod';
import {
  GenderEnum,
  LevelOfEducationEnum,
  RaceEnum,
  UserRole,
} from '@obg/enums';
import { baseUserSchema } from '../base/base-user.schema';

export const specialCategoriesSchema = z.enum([
  'INDIGENOUS',
  'RIVERSIDECOMUNITIES',
  'BLACKPOPULATION',
  'QUILOMBOLA',
  'PCD',
  'OTHERTRADITIONALCOMMUNITIES',
]);

export const studentUserSchema = baseUserSchema
  .extend({
    role: z.literal(UserRole.STUDENT),
    cpf: z.string().length(11, 'CPF must be at least 11 characters long'),
    nis: z.string().optional(),
    motherName: z
      .string()
      .min(3, 'Mother name must be at least 3 characters long'),
    phone: z.string().optional(),
    birthDate: z.date(),
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