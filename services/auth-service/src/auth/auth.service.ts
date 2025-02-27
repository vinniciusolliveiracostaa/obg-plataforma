import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { User, UserPayload, UserToken } from '@repo/common/index';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
//import * as bcrypt from 'bcrypt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_CONSUMER') private natsClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: User): Promise<UserToken> {
    try {
      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles
      };


      const accessToken = this.jwtService.sign(payload);

      return { 
        access_token: accessToken,
      };
    } catch (error) {
        throw new RpcException(error.message)
    }
  }

  async validateUser(payload: {email: string, password: string}): Promise<Omit<User, 'password'>> {
    try {
      const user = await lastValueFrom(this.natsClient.send({ cmd: 'find.email.user'}, payload.email));

      if (!user) {
        throw new RpcException(user.message)
      }

      const isPasswordValid = await argon2.verify(payload.password, user.password);

      if (isPasswordValid) {
        const { password, ...result } = user;
        return result
      } else {
        throw new RpcException('Incorrect password')
      }
    } catch (error) {
      throw new RpcException('Incorrect password');
    }
  }
}

