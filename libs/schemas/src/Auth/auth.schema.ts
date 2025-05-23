import { z } from 'zod';

export const authLoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

export type AuthLoginDto = z.infer<typeof authLoginSchema>;