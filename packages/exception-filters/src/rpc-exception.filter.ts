import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class ExceptionFilter implements RpcExceptionFilter<any> {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    if (exception instanceof RpcException) {
      const error = exception.getError();
      return throwError(() =>
        typeof error === 'string' ? { message: error } : error,
      );
    }
    // Captura outros erros e padroniza
    return throwError(() => ({
      message: exception?.message || 'Internal server error',
    }));
  }
}
