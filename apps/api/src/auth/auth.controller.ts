import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthLoginDto } from '@obg/schemas/dist/Auth/auth.schema';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(@Inject('API_GATEWAY_CONSUMER') private client: ClientProxy) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    try {
      return await firstValueFrom(this.client.send('authLogin', authLoginDto));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}