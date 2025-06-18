import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodType } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType<any, any, any>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        error: this.formatZodError(result.error),
      });
    }

    return result.data;
  }

  private formatZodError(error: ZodError): Record<string, string[]> {
    const fieldErrors = error.flatten().fieldErrors;
    const formatted: Record<string, string[]> = {};

    for (const key in fieldErrors) {
      if (fieldErrors[key]) {
        formatted[key] = fieldErrors[key] as string[];
      }
    }

    return formatted;
  }
}
