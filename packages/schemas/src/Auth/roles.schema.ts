import { z } from 'zod/v4';

export const userRoleSchema = z.enum(['USER', 'ADMIN', 'TEACHER', 'STUDENT']);
