import { UF } from '@obg/enums';
import { z } from 'zod';

export const UFSchema = z.nativeEnum(UF);

export const ufList = Object.values(UF);
