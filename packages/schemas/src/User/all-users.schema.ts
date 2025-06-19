import { z } from 'zod/v4';
import { createUserSchema, updateUserSchema } from './user.schema';
import {
  createTeacherSchema,
  updateTeacherSchema,
} from '../Teacher/teacher.schema';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../Student/student.schema';
import {
  createAdminUserSchema,
  updateAdminUserSchema,
} from '../Admin/admin.schema';

export const CreateAllUsersSchema = z.discriminatedUnion('role', [
  createUserSchema,
  createAdminUserSchema,
  createTeacherSchema,
  createStudentSchema,
]);
export const UpdateAllUsersSchema = z.discriminatedUnion('role', [
  updateUserSchema,
  updateAdminUserSchema,
  updateTeacherSchema,
  updateStudentSchema,
]);

export type CreateAllUsersDto = z.infer<typeof CreateAllUsersSchema>;
export type UpdateAllUsersDto = z.infer<typeof UpdateAllUsersSchema>;
