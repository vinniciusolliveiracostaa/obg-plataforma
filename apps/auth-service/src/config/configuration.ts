import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const natsConfigValidationSchema = Joi.object({
  NATS_URL: Joi.string().required(),
  NATS_QUEUE: Joi.string().required(),
  NATS_NAME: Joi.string().required(),
  NATS_USER: Joi.string().optional(),
  NATS_PASS: Joi.string().optional(),
  NATS_TIMEOUT: Joi.number().default(5000),
});

export const natsConfig = registerAs('nats', () => {
  return {
    url: process.env.NATS_URL,
    queue: process.env.NATS_QUEUE,
    user: process.env.NATS_USER,
    pass: process.env.NATS_PASS,
    timeout:
      process.env.NATS_TIMEOUT !== undefined
        ? parseInt(process.env.NATS_TIMEOUT, 10)
        : 5000,
  };
});
