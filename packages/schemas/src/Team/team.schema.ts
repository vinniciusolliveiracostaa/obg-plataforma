import { z } from 'zod/v4';

export const teamSchema = z
  .object({
    id: z.cuid2(),
    name: z.string(),
    description: z.string().optional(),
    studentsId: z.array(z.cuid()).default([]),
    teacherId: z.cuid(),
    schoolId: z.cuid(),
  })
  .strict();
