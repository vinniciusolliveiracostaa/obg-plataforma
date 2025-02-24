import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('USERS_CONSUMER') private natsClient: ClientProxy,) {
    super({ usernameField: 'email' });
  }

  async validate(payload: {email: string, password: string}) {
    try {
      console.log("Passando no LocalStrategy Common Lib", payload)
      const user = await lastValueFrom(this.natsClient.send({cmd:'validate.auth'},payload));
      return user;
    } catch (error) {
      throw new RpcException((error as Error).message);
    }
  }
}
