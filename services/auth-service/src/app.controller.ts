import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { AuthRequest, User, } from '@repo/common/index'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd:'signIn.auth'})
  async signIn(@Payload() req: User) {
    try {
      const auth = this.appService.signIn(req);
      return auth
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'validate.auth' })
  async validateUser(@Payload() payload: {email: string, password: string}) {
    try {
      const user = this.appService.validateUser(payload);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
