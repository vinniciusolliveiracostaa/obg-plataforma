import { Inject, Injectable } from '@nestjs/common';
import { AuthLoginDto } from '@obg/schemas';
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

  async login(authLoginDto: AuthLoginDto) {
    try {
      const user = await lastValueFrom(
        this.client.send('findOneUserByEmail', authLoginDto.email),
      );

      if (!user) {
        throw new RpcException('INVALID_CREDENTIALS');
      }

      const isPasswordValid = await argon2.verify(
        user.password,
        authLoginDto.password,
      );

      if (!isPasswordValid) {
        throw new RpcException('INVALID_CREDENTIALS');
      }

      const token = await this.jwtService.signAsync({
        name: user.name,
        email: user.email,
        role: user.role,
        sub: user.id,
      });
      return { accessToken: token };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}