import { z } from 'zod';
import { createUserSchema } from './user/user.schema';
import { createAdminUserSchema } from './admin/admin.schema';
import { createTeacherUserSchema } from './teacher/teacher.schema';
import { createStudentUserSchema } from './student/student.schema';

export const createBaseUserSchema = z.discriminatedUnion('role', [
  createUserSchema,
  createAdminUserSchema,
  createTeacherUserSchema,
  createStudentUserSchema,
]);

export const updateBaseUserSchema = z.discriminatedUnion('role', [
  createUserSchema,
  createAdminUserSchema,
  createTeacherUserSchema,
  createStudentUserSchema,
]);

export type CreateBaseUserDto = z.infer<typeof createBaseUserSchema>;
export type UpdateBaseUserDto = z.infer<typeof updateBaseUserSchema>;