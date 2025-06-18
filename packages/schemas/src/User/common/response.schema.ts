import { z } from 'zod';
import { baseUserSchema } from '../base/base-user.schema';
import { adminUserSchema } from '../admin/admin.schema';
import { teacherUserSchema } from '../teacher/teacher.schema';
import { studentUserSchema } from '../student/student.schema';

const AllUserSchemas = z.union([
  baseUserSchema,
  adminUserSchema,
  teacherUserSchema,
  studentUserSchema,
]);

// Lista paginada
export const usersResponseSchema = z.object({
  data: z.array(AllUserSchemas),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

// Resposta de usuário único
export const userResponseSchema = z.object({
  data: AllUserSchemas,
});

// Tipos TypeScript
export type UsersResponse = z.infer<typeof usersResponseSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;