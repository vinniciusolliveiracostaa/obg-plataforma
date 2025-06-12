import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { BaseUserDto } from '@obg/schemas';
import * as argon2 from 'argon2';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    @Inject('AUTH_SERVICE_CONSUMER') private client: ClientProxy,
  ) {}

  async login(user: BaseUserDto) {
    try {
      const payload = {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async validateUser(email: string, password: string): Promise<BaseUserDto> {
    console.log('🔐 Validando usuário', { email, password });
    const user = await lastValueFrom(
      this.client.send('findOneUserByEmail', email),
    );
    console.error('🧍 Resultado da validação:', user);
    if (user) {
      const isPasswordValid = await argon2.verify(user.password, password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new RpcException('INVALID_CREDENTIALS');
  }
}
