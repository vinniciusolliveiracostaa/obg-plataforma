import { z } from 'zod';
import { SchoolLocationSchema } from './school-location.schema';
import { SchoolLocalitySchema } from './school-locality.schema';
import { SchoolAdministrativeCategorySchema } from './school-administrative-category.schema';
import { SchoolServiceRestrictionSchema } from './school-service-restriction.schema';
import { UFSchema } from '../UF/uf.schema';
import { SchoolAdministrativeDependenceSchema } from './school-administrative-dependence.schema';
import { SchoolPrivateCategorySchema } from './school-private-category.schema';
import {
  SchoolLatitudeSchema,
  SchoolLongitudeSchema,
} from './school-latitude-longitude.schema';

export const schoolSchema = z
  .object({
    id: z.string().cuid(),
    name: z.string().min(1, 'Nome é Obrigatório'),
    inep: z.string().length(8, 'INEP deve ter exatamente 8 caracteres'),
    uf: UFSchema,
    city: z.string().min(1, 'Cidade é Obrigatória'),
    location: SchoolLocationSchema,
    locality: SchoolLocalitySchema,
    administrativeCategory: SchoolAdministrativeCategorySchema,
    serviceRestriction: SchoolServiceRestrictionSchema,
    address: z.string().min(1, 'Endereço é Obrigatório'),
    phone: z
      .string()
      .regex(/^\+?[0-9\s\-()]{7,15}$/, 'Telefone inválido')
      .optional(),
    administrativeDependence: SchoolAdministrativeDependenceSchema,
    privateCategory: SchoolPrivateCategorySchema,
    publicPowerAgreement: z.enum(['Sim', 'Não']),
    regulation: z.string().optional(),
    size: z.string().optional(),
    teachingModalityStage: z.string().optional(),
    otherOffers: z.string().optional(),
    latitude: SchoolLatitudeSchema,

    longitude: SchoolLongitudeSchema,
  })
  .required();

// Schema para a criação (sem o id)
export const createSchoolSchema = schoolSchema.omit({ id: true });

// Schema para a atualização (com o id)
export const updateSchoolSchema = schoolSchema.omit({ id: true }).partial();

// Schema para a resposta da API (lista de escolas)
export const schoolsResponseSchema = z.object({
  data: z.array(schoolSchema),
  total: z.number(),
  totalPages: z.number(),
});

// Tipos inferidos dos schemas - use esses tipos para validação de dados
export type School = z.infer<typeof schoolSchema>;
export type SchoolsResponse = z.infer<typeof schoolsResponseSchema>;
export type CreateSchoolDto = z.infer<typeof createSchoolSchema>;
export type UpdateSchoolDto = z.infer<typeof updateSchoolSchema>;
