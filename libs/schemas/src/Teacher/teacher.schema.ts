import { z } from 'zod/v4';

export const teacherSchema = z
  .object({
    cpf: z.string(),
  })
  .strict();

// Schema para a criação
export const createTeacherSchema = teacherSchema;

// Schema para a atualização (sem o cpf)
export const updateTeacherSchema = teacherSchema.omit({ cpf: true }).partial();

// Schema para a resposta da API (lista de professores)
export const teachersResponseSchema = z.object({
  data: z.array(teacherSchema),
  total: z.number(),
  totalPages: z.number(),
});

// Tipos inferidos dos schemas - use esses tipos para validação de dados
export type TeacherSchemaType = z.infer<typeof teacherSchema>;
export type TeachersResponse = z.infer<typeof teachersResponseSchema>;
export type CreateTeacherDto = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherDto = z.infer<typeof updateTeacherSchema>;