import { z } from 'zod';
import { userRoleSchema } from './userRole.schema';
import { permissionsListSchema } from '../Auth/permissions.schema';

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

// Schema para a criação (sem o id)
export const createUserSchema = userSchema.omit({ id: true });

// Schema para a atualização (sem o id)
export const updateUserSchema = userSchema.omit({ id: true }).partial();

// Schema para a resposta da API (lista de usuários)
export const usersResponseSchema = z.object({
  data: z.array(userSchema),
  total: z.number(),
  totalPages: z.number(),
});

// Tipos inferidos dos schemas - use esses tipos para validação de dados
export type UserSchemaType = z.infer<typeof userSchema>;
export type UsersResponse = z.infer<typeof usersResponseSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;