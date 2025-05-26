import { z } from 'zod/v4';

export const studentSchema = z
  .object({
    cpf: z.string(),
  })
  .strict();

// Schema para a criação
export const createStudentSchema = studentSchema;

// Schema para a atualização (sem o cpf)
export const updateStudentSchema = studentSchema.omit({ cpf: true }).partial();

// Schema para a resposta da API (lista de alunos)
export const studentsResponseSchema = z.object({
  data: z.array(studentSchema),
  total: z.number(),
  totalPages: z.number(),
});

// Tipos inferidos dos schemas - use esses tipos para validação de dados
export type StudentSchemaType = z.infer<typeof studentSchema>;
export type StudentsResponse = z.infer<typeof studentsResponseSchema>;
export type CreateStudentDto = z.infer<typeof createStudentSchema>;
export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;