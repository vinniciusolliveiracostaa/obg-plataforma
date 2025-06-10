import { AppException } from '@obg/errors';
import { RpcException } from '@nestjs/microservices';

export async function wrapRpc<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof AppException) {
      // Passa só o payload, já tratado pelo AppException
      throw new RpcException({
        code: error.code,
        message: error.message,
        metadata: error.metadata || null,
      });
    }

    // Se não for um AppException, lança como RpcException desconhecido
    throw new RpcException({
      code: 'UNHANDLED_ERROR',
      message: error?.message || 'An unexpected error occurred',
    });
  }
}
