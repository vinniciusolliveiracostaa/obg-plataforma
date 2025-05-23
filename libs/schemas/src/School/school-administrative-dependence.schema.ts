import { AdministrativeDependencies } from '@obg/enums';
import { z } from 'zod';

export const SchoolAdministrativeDependenceSchema = z.nativeEnum(
  AdministrativeDependencies,
);

export const schoolAdministrativeDependenceList = Object.values(
  AdministrativeDependencies,
);
