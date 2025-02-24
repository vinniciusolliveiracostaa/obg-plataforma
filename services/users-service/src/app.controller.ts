import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CreateUserDto } from '@repo/common/index';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create.user' })
  async create(@Payload() createUserDto: CreateUserDto) {
    try {
      const user = await this.appService.create(createUserDto);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'find.all.users' })
  async findAll() {
    try {
      const users = await this.appService.getUsers();
      return users;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'find.email.user'})
  async findUser(email: string) {
    try {
      const user = await this.appService.getUserByEmail(email);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
