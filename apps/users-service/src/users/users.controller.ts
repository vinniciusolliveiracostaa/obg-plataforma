import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CreateUserDto, CreateUserRoleDto, UpdateUserDto, UpdateUserRoleDto } from '@repo/dtos/index';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({cmd: 'create.user'})
  async create(@Payload() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({cmd: 'find.all.users'})
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return users;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({cmd: 'find.one.user'})
  async findOne(@Payload() id: string) {
    try {
      const user = await this.usersService.findOne(id);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({cmd: 'delete.user'})
  async delete(@Payload() id: string) {
    try {
      const user = await this.usersService.delete(id);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({cmd: 'update.user'})
  async update(@Payload() id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}