import { Privatecategory } from '@obg/enums';
import { z } from 'zod';

export const SchoolPrivateCategorySchema = z.nativeEnum(Privatecategory);

export const schoolPrivateCategoryList = Object.values(Privatecategory);
