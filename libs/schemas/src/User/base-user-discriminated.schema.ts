import { z } from 'zod';
import {
  createUserSchema,
  removeUserSchema,
  updateUserSchema,
} from './user/user.schema';
import {
  createAdminUserSchema,
  removeAdminUserSchema,
  updateAdminUserSchema,
} from './admin/admin.schema';
import {
  createTeacherUserSchema,
  removeTeacherUserSchema,
  updateTeacherUserSchema,
} from './teacher/teacher.schema';
import {
  createStudentUserSchema,
  removeStudentUserSchema,
  updateStudentUserSchema,
} from './student/student.schema';

export const createBaseUserSchema = z.discriminatedUnion('role', [
  createUserSchema,
  createAdminUserSchema,
  createTeacherUserSchema,
  createStudentUserSchema,
]);

export const updateBaseUserSchema = z.discriminatedUnion('role', [
  updateUserSchema,
  updateAdminUserSchema,
  updateTeacherUserSchema,
  updateStudentUserSchema,
]);

export const removeBaseUserSchema = z.discriminatedUnion('role', [
  removeUserSchema,
  removeAdminUserSchema,
  removeTeacherUserSchema,
  removeStudentUserSchema,
]);

export type CreateBaseUserDto = z.infer<typeof createBaseUserSchema>;
export type UpdateBaseUserDto = z.infer<typeof updateBaseUserSchema>;
export type RemoveBaseUserDto = z.infer<typeof removeBaseUserSchema>;
