import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthRequest } from '@obg/interfaces';
import { firstValueFrom } from 'rxjs';
import { BaseUserDto } from '@obg/schemas';

@Injectable()
export class AuthService {
  constructor(@Inject('API_GATEWAY_CONSUMER') private client: ClientProxy) {}

  async login(req: AuthRequest) {
    return await firstValueFrom(this.client.send('auth.login', req.user));
  }

  async profile(currentUser: BaseUserDto): Promise<BaseUserDto> {
    return currentUser;
  }
}
