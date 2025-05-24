import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CurrentUSer, IsPublic } from '@obg/decorators';
import { AuthRequest } from '@obg/interfaces';
import { LocalAuthGuard } from '../guards/local.guard';
import { UserSchemaType } from '@obg/schemas';

@Controller('auth')
export class AuthController {
  constructor(@Inject('API_GATEWAY_CONSUMER') private client: ClientProxy) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthRequest) {
    console.log(req.user);
    try {
      const user = await firstValueFrom(
        this.client.send('authLogin', req.user),
      );
      return user;
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

  @Get('/profile')
  async profile(
    @CurrentUSer() currentUser: UserSchemaType,
  ): Promise<UserSchemaType> {
    return currentUser;
  }
}