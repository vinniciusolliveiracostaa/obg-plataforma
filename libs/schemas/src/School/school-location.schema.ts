import { Location } from '@obg/enums';
import { z } from 'zod';

export const SchoolLocationSchema = z.nativeEnum(Location);

export const schoolLocationList = Object.values(Location);
