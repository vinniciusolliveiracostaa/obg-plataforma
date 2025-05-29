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
import { BaseUserDto } from '@obg/schemas';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(@Inject('API_GATEWAY_CONSUMER') private client: ClientProxy) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Realiza o login do usuário',
  })
  async login(@Request() req: AuthRequest) {
    try {
      return await firstValueFrom(this.client.send('authLogin', req.user));
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
  async profile(@CurrentUSer() currentUser: BaseUserDto): Promise<BaseUserDto> {
    return currentUser;
  }
}
