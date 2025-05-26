import { z } from 'zod/v4';
import { userRoleSchema } from './userRole.schema';
import { permissionsListSchema } from '../Auth/permissions.schema';
import { UserRole } from '@obg/enums';
import { teacherSchema } from '../Teacher/teacher.schema';
import { studentSchema } from '../../Student/student.schema';

export const userSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    role: userRoleSchema,
    permissions: permissionsListSchema.optional(),
  })
  .strict();

// Base schema para criação de usuário de vários tipos

const user = userSchema.extend({ role: z.literal(UserRole.USER) });

const admin = userSchema.extend({ role: z.literal(UserRole.ADMIN) });

const teacher = userSchema
  .extend({
    role: z.literal(UserRole.TEACHER),
  })
  .merge(teacherSchema);

const student = userSchema
  .extend({
    role: z.literal(UserRole.STUDENT),
  })
  .merge(studentSchema);

const createUserSchema = z.discriminatedUnion('role', [
  user,
  admin,
  teacher,
  student,
]);

// Schema para a atualização (sem o id)
export const updateUserSchema = userSchema.omit({ id: true }).partial();

// Schema para a resposta da API (lista de usuários)
export const usersResponseSchema = z.object({
  data: z.array(userSchema.omit({ password: true })),
  total: z.number(),
  totalPages: z.number(),
});

// Tipos inferidos dos schemas - use esses tipos para validação de dados
export type UserSchemaType = z.infer<typeof userSchema>;
export type UsersResponse = z.infer<typeof usersResponseSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;