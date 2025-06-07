import { z } from 'zod';

export const teamSchema = z
  .object({
    id: z.string().cuid(),
    name: z.string(),
    description: z.string().optional(),
    studentsId: z.array(z.string().cuid()).default([]),
    teacherId: z.string().cuid(),
    schoolId: z.string().cuid(),
  })
  .strict();

export const createTeamSchema = teamSchema.omit({ id: true });
export const updateTeamSchema = teamSchema.partial().omit({ id: true });

export type Team = z.infer<typeof teamSchema>;
export type CreateTeamDto = z.infer<typeof createTeamSchema>;
export type UpdateTeamDto = z.infer<typeof updateTeamSchema>;

// Schema para a resposta da API (lista de equipes)
export const teamsResponseSchema = z.object({
  data: z.array(teamSchema),
  total: z.number(),
  totalPages: z.number(),
});
