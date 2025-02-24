import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto, CreateSchoolDto, Role } from '@repo/common/index';
import { UsersService } from './users/users.service';
import { SchoolsService } from './schools/schools.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private readonly schoolsService: SchoolsService,
  ) {}

  async create(@Body() createUserDto: CreateUserDto) {
    let createdUser: any;
    let roleData: any;
    try {
      createdUser = await this.usersService.create(createUserDto);
      try {
        if (createUserDto.roles.includes(Role.SCHOOL)) {
          const createSchoolDto: CreateSchoolDto = {
            userId: createdUser.id,
            ...createUserDto.roleData
          };

          roleData = await this.schoolsService.create(createSchoolDto);
        }
      } catch (roleError) {
        if (roleError.message === 'INEP already exists') {
          await this.usersService.delete(createdUser.id);
          throw new RpcException('INEP already exists');
        }
        throw new RpcException(roleError.message);
      }
      return createdUser;
    } catch (error) {
      if (error.message === 'Email already exists') {
        throw new RpcException('Email already exists');
      }
      throw new RpcException(error.message);
    }
  }

  async getUserByEmail(email:string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async getUsers() {
    try {
      const users = await this.usersService.getUsers();
      return users;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
