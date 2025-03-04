import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserRoleDto, UpdateUserRoleDto } from '@repo/dtos/index';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CreateUserRoleService {
  constructor(@Inject('ROLES_CONSUMER') private natsClient: ClientProxy) {}
  async createUserRole(@Body() createUserRoleDto: CreateUserRoleDto) {
    try {
      const userRole = await lastValueFrom(
        this.natsClient.send({ cmd: 'create.user.role' }, createUserRoleDto),
      );
      return userRole;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAllUserRole(id: string) {
    try {
      const userRoles = await lastValueFrom(
        this.natsClient.send({ cmd: 'find.all.user.roles' }, id),
      );
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOneUserRole(id: string) {
    try {
      const userRole = await lastValueFrom(
        this.natsClient.send({ cmd: 'find.one.user.role' }, id),
      );
      return userRole;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async deleteUserRole(id: string) {
    try {
      const userRole = await lastValueFrom(
        this.natsClient.send({ cmd: 'delete.user.role' }, id),
      );
      return userRole;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async updateUserRole(payload: {
    id: string;
    updateUserRoleDto: UpdateUserRoleDto;
  }) {
    try {
      const userRole = await lastValueFrom(
        this.natsClient.send({ cmd: 'update.user.role' }, payload),
      );
      return userRole;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
