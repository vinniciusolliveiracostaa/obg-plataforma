import { Servicerestriction } from '@obg/enums';
import { z } from 'zod';

export const SchoolServiceRestrictionSchema = z.nativeEnum(Servicerestriction);

export const schoolServiceRestrictionList = Object.values(Servicerestriction);
