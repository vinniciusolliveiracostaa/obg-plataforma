import { z } from 'zod/v4';

export const permissionsSchema = z.object({
  action: z.string(),
  resource: z.string(),
  condition: z.record(z.string(), z.any()).optional(),
});

export const permissionsArraySchema = z.array(permissionsSchema);
