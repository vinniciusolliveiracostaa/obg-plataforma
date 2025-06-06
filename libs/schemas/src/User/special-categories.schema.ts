import { z } from 'zod';

export const specialCategoriesSchema = z.enum([
  'INDIGENOUS',
  'RIVERSIDECOMUNITIES',
  'BLACKPOPULATION',
  'QUILOMBOLA',
  'PCD',
  'OTHERTRADITIONALCOMMUNITIES',
]);