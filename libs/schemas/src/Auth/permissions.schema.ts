import { z } from 'zod';

export const permissionSchema = z.object({
  action: z.string(),
  resource: z.string(),
  condition: z.record(z.any()).optional(),
});

export const permissionsListSchema = z.array(permissionSchema);

export type Permission = z.infer<typeof permissionSchema>;
export type PermissionsList = z.infer<typeof permissionsListSchema>;
