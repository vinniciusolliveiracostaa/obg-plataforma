import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const message = this.formatZodError(result.error);
      throw new BadRequestException(message); // .message vai conter esse texto
    }

    return result.data;
  }

  private formatZodError(error: any): string {
    return Object.values(error.flatten().fieldErrors)
      .flat()
      .filter(Boolean)
      .join('; ');
  }
}
