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

  @MessagePattern({cmd: 'create.user.role'})
  async createUserRole(@Payload() payload:{userId: string, createUserRoleDto: CreateUserRoleDto}) {
    try {
      const role = await this.usersService.createUserRole(payload);
      return role;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({cmd: 'create.user.role'})
  async findAllUserRole() {
    try {
      const userRoles = await this.usersService.findAllUserRole();
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message)
    }
  }

  @MessagePattern({cmd: 'create.user.role'})
  async findOneUserRole(@Payload('id') id: string) {
    try {
      const userRoles = await this.usersService.findOneUserRole(id);
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message)
    }
  }

  @MessagePattern({cmd: 'create.user.role'})
  async deleteUserRole(@Payload('id') id: string) {
    try {
      const userRoles = await this.usersService.deleteUserRole(id);
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message)
    }
  }

  @MessagePattern({cmd: 'create.user.role'})
  async updateUserRole(@Payload('id') payload:{id: string, updateUserRoleDto: UpdateUserRoleDto}) {
    try {
      const userRoles = await await this.usersService.updateUserRole(payload);
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message)
    }
  }
}
