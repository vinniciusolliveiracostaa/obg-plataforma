// eslint-disable-next-line @typescript-eslint/no-unused-vars
// noinspection ES6UnusedImports

import type * as express from 'express';
import type { User } from '@repo/schemas';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}