// school-latitude-longitude.schema.ts
import { z } from 'zod';

export const SchoolLatitudeRaw = z.string().optional();
export const SchoolLongitudeRaw = z.string().optional();

export const SchoolLatitudeSchema = SchoolLatitudeRaw.refine((val) => {
  if (!val) return true;
  const num = parseFloat(val);
  return num >= -90 && num <= 90;
}, 'Latitude inválida');

export const SchoolLongitudeSchema = SchoolLongitudeRaw.refine((val) => {
  if (!val) return true;
  const num = parseFloat(val);
  return num >= -180 && num <= 180;
}, 'Longitude inválida');
