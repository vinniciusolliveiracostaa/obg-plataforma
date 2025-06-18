import { Administrativecategory } from '@obg/enums';
import { z } from 'zod';

export const SchoolAdministrativeCategorySchema = z.nativeEnum(
  Administrativecategory,
);

export const schoolAdministrativeCategoryList = Object.values(
  Administrativecategory,
);
