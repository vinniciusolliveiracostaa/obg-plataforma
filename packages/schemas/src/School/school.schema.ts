import { z } from 'zod/v4';
import {
  Administrativecategory,
  AdministrativeDependencies,
  Locality,
  Location,
  Privatecategory,
  Servicerestriction,
  UF,
} from '@obg/enums';

export const schoolSchema = z
  .object({
    id: z.cuid2(),
    name: z.string().min(1, 'Nome é Obrigatório'),
    inep: z.string().length(8, 'INEP deve ter exatamente 8 caracteres'),
    uf: z.enum(UF),
    city: z.string().min(1, 'Cidade é Obrigatória'),
    location: z.enum(Location),
    locality: z.enum(Locality),
    administrativeCategory: z.enum(Administrativecategory),
    serviceRestriction: z.enum(Servicerestriction),
    address: z.string().min(1, 'Endereço é Obrigatório'),
    phone: z
      .string()
      .regex(/^\+?[0-9\s\-()]{7,15}$/, 'Telefone inválido')
      .optional(),
    administrativeDependence: z.enum(AdministrativeDependencies),
    privateCategory: z.enum(Privatecategory),
    publicPowerAgreement: z.enum(['Sim', 'Não']),
    regulation: z.string().optional(),
    size: z.string().optional(),
    teachingModalityStage: z.string().optional(),
    otherOffers: z.string().optional(),
    latitude: z
      .number()
      .min(-90, 'Latitude mínima é -90')
      .max(90, 'Latitude máxima é 90'),

    longitude: z
      .number()
      .min(-180, 'Longitude mínima é -180')
      .max(180, 'Longitude máxima é 180'),
  })
  .required();
