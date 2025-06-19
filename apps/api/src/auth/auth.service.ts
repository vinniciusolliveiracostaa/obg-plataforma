import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { BaseUserDto, CreateAllUsersDto } from '@obg/schemas';
import { AuthRequest } from '@obg/interfaces';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  constructor(@Inject('AUTH_CLIENT') private client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  async register(data: CreateAllUsersDto) {
    try {
      console.log(data);
      return await lastValueFrom(this.client.send('user.create', data));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(req: AuthRequest) {
    try {
      console.log(req.user);
      return await firstValueFrom(this.client.send('auth.login', req.user));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async refresh() {}

  async logout() {}

  async forgotPassword() {}

  async resetPassword() {}

  async me(currentUser: BaseUserDto): Promise<BaseUserDto> {
    return currentUser;
  }
}
