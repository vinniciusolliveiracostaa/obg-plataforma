import { Body, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { createId } from '@paralleldrive/cuid2';
import { CreateUserRoleDto, UpdateUserRoleDto } from '@repo/dtos/index';
import { UserRole } from '@repo/entities/index';
import { Repository, EntityManager } from 'typeorm';
@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly entityManager: EntityManager,
  ) {}

  async createUserRole(
    @Body() createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRole> {
    try {
      const existingRole = await this.userRoleRepository.findOne({
        where: { name: createUserRoleDto.name },
      });

      if (existingRole) {
        throw new RpcException('Role already exists');
      }
      const role = new UserRole({
        ...createUserRoleDto,
        id: createId(),
      });

      const createdRole = await this.entityManager.save(role);
      return createdRole;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAllUserRole() {
    try {
      const userRoles = await this.userRoleRepository.find();
      if (userRoles.length === 0) {
        throw new RpcException('No Roles found');
      }
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOneUserRole(id: string) {
    try {
      const userRole = await this.userRoleRepository.findOne({ where: { id } });
      if (!userRole) {
        throw new RpcException('Role not found');
      }
      return userRole;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  async deleteUserRole(id: string) {
    try {
      const userRole = await this.userRoleRepository.find({ where: { id } });

      if (!userRole) {
        throw new RpcException('Role not found');
      }

      await this.entityManager.remove(UserRole, userRole);
      return { message: 'Role deleted successfully' };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  async updateUserRole(payload: {
    id: string;
    updateUserRoleDto: UpdateUserRoleDto;
  }) {
    try {
      const id = payload.id;
      const updateUserRoleDto = payload.updateUserRoleDto;
      const user = await this.userRoleRepository.findOne({ where: { id } });
      if (!user) {
        throw new RpcException('User not found');
      }

      await this.entityManager.update(UserRole, id, updateUserRoleDto);

      return {
        user: user,
        message: 'User updated successfully',
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
