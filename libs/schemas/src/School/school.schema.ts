import { z } from 'zod';

export const SchoolSchema = z.object({
  id: z.string(),

  name: z.string(),

  inep: z.string(),

  uf: z.string(),

  city: z.string(),

  location: z.string(),

  locality: z.string(),

  administrativecategory: z.string(),

  servicerestriction: z.string(),

  address: z.string(),

  phone: z.string(),

  administrativedependence: z.string(),

  privatecategory: z.string(),

  publicpoweragreement: z.string(),

  regulation: z.string(),

  size: z.string(),

  teachingmodalitystage: z.string(),

  otheroffers: z.string(),

  latitude: z.string(),

  longitude: z.string(),
});

// Para Tipagem Typescript
export type SchoolSchemaType = z.infer<typeof SchoolSchema>;
export type SchoolsResponseSchemaType = z.infer<typeof schoolsResponseSchema>;

// Para Validação de Dados
export const schoolsResponseSchema = z.object({
  data: z.array(SchoolSchema),
  total: z.number(),
  totalPages: z.number(),
});
