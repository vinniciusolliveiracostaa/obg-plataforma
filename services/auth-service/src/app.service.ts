import { Injectable } from '@nestjs/common';
import { User } from '@repo/common/index';
import { AuthService } from './auth/auth.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}

  async signIn(user: User) {
    try {
      const signIn = await this.authService.signIn(user);
      return signIn;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async validateUser(payload: {
    email: string;
    password: string;
  }): Promise<Omit<User, 'password'>> {
    try {
      const user = this.authService.validateUser(payload);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
