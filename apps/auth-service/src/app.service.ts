import { Inject, Injectable } from '@nestjs/common';
import { UserSchemaType } from '@obg/schemas';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    @Inject('AUTH_SERVICE_CONSUMER') private client: ClientProxy,
  ) {}

  async login(user: UserSchemaType) {
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

  async validateUser(email: string, password: string): Promise<UserSchemaType> {
    const user = await lastValueFrom(
      this.client.send('findOneUserByEmail', email),
    );
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