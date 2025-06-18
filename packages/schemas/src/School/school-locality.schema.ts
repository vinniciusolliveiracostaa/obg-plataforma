import { Locality } from '@obg/enums';
import { z } from 'zod';

export const SchoolLocalitySchema = z.nativeEnum(Locality);

export const schoolLocalityList = Object.values(Locality);
