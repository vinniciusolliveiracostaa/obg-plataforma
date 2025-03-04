import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createId } from '@paralleldrive/cuid2';
import {
  CreateSchoolDto,
  CreateUserDto,
  CreateUserRoleDto,
  UpdateUserDto,
  UpdateUserRoleDto,
} from '@repo/dtos/index';
import { User, UserRole } from '@repo/entities/index';
import { Repository, EntityManager, In } from 'typeorm';
import * as argon2 from 'argon2';
import { Domains } from '@repo/common/index';
import { Payload, RpcException } from '@nestjs/microservices';
import { UserCreateSchoolService } from './schools/school.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly entityManager: EntityManager,
    private readonly userCreateSchoolService: UserCreateSchoolService,
  ) {}

  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: Omit<User, 'password'>; message: string }> {
    let createdUser: any;
    let roleData: any;
    try {
      if (!createUserDto.email || !createUserDto.password) {
        throw new RpcException('Missing email or password');
      }

      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new RpcException('Email already exists');
      }

      const hashedPassword = await argon2.hash(createUserDto.password);

      const user = new User({
        ...createUserDto,
        id: createId(),
        password: hashedPassword,
      });

      createdUser = await this.entityManager.save(user);

      try {
        if (createUserDto.domainGroup.includes(Domains.School)) {
          const createSchoolDto: CreateSchoolDto = {
            userId: createdUser.id,
            ...createUserDto.roleData,
          };
          roleData = await this.userCreateSchoolService.create(createSchoolDto);
        }
      } catch (roleError) {
        if (roleError.message === 'School already exists') {
          await this.delete(createdUser.id);
          throw new RpcException('School already exists');
        }
        throw new RpcException(roleError.message);
      }

      const { password, ...result } = createdUser;

      return {
        user: result,
        message: 'User created successfully',
      };
    } catch (error) {
      if (error.message === 'Email already exists') {
        throw new RpcException('Email already exists');
      }
      if (error.message === 'Missing email or password') {
        throw new RpcException('Missing email or password');
      }
      throw new RpcException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find();
      if (users.length === 0) {
        throw new RpcException('No users found');
      }
      return users;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new RpcException('User not found');
      }
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new RpcException('User not found');
      }
      await this.entityManager.remove(User, user);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ user: Omit<User, 'password'>; message: string }> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new RpcException('User not found');
      }

      if (updateUserDto.password) {
        const hashedPassword = await argon2.hash(updateUserDto.password);
        updateUserDto.password = hashedPassword;
      }
      await this.entityManager.update(User, id, updateUserDto);

      const { password, ...result } = user;
      return {
        user: result,
        message: 'User updated successfully',
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async createUserRole(
    @Body() payload: { userId: string; createUserRoleDto: CreateUserRoleDto },
  ): Promise<UserRole> {
    try {
        const userId = payload.userId;
        const createUserRoleDto = payload.createUserRoleDto;

      const role = new UserRole({
        ...createUserRoleDto,
        id: createId(),
        userId: userId,
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
