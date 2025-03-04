import { Controller } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateUserRoleDto, UpdateUserRoleDto } from '@repo/dtos/index';

@Controller()
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @MessagePattern({ cmd: 'create.user.role' })
  async createUserRole(@Payload() createUserRoleDto: CreateUserRoleDto) {
    try {
      const userRole =
        await this.userRolesService.createUserRole(createUserRoleDto);
      return userRole;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'find.all.user.roles' })
  async findAllUserRole() {
    try {
      const userRoles = await this.userRolesService.findAllUserRole();
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'find.one.user.role' })
  async findOneUserRole(@Payload('id') id: string) {
    try {
      const userRoles = await this.userRolesService.findOneUserRole(id);
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'delete.user.role' })
  async deleteUserRole(@Payload('id') id: string) {
    try {
      const userRoles = await this.userRolesService.deleteUserRole(id);
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'update.user.role' })
  async updateUserRole(
    @Payload('id')
    payload: {
      id: string;
      updateUserRoleDto: UpdateUserRoleDto;
    },
  ) {
    try {
      const userRoles =
        await await this.userRolesService.updateUserRole(payload);
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
