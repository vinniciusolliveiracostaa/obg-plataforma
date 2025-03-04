import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  CreateUserDto,
  CreateUserRoleDto,
  UpdateUserDto,
  UpdateUserRoleDto,
} from '@repo/dtos/index';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('GATEWAY_USERS_CONSUMER') private natsClient: ClientProxy,
  ) {}

  // Inicializa o client NATS no momento que o módulo é carregado
  onModuleInit() {
    this.natsClient.connect();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await lastValueFrom(
        this.natsClient.send({ cmd: 'create.user' }, createUserDto),
      );
      return user;
    } catch (error) {
      if (error.message === 'Email already exists') {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'Email already exists!',
            error: error.message,
          },
          HttpStatus.CONFLICT,
        );
      }

      if (error.message === 'School already exists') {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'School already exists!',
            error: error.message,
          },
          HttpStatus.CONFLICT,
        );
      }

      // Erro genérico de criação de usuário
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro ao criar usuário',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await lastValueFrom(
        this.natsClient.send({ cmd: 'find.all.users' }, {}),
      );
      return users;
    } catch (error) {
      if (error.message === 'No users found') {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Nenhum usuário encontrado',
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new RpcException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await lastValueFrom(
        this.natsClient.send({ cmd: 'find.one.user' }, id),
      );
      return user;
    } catch (error) {
      if (error.message === 'User not found') {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Usuário nao encontrado',
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new RpcException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const user = await lastValueFrom(
        this.natsClient.send({ cmd: 'delete.user' }, id),
      );
      return user;
    } catch (error) {
      if (error.message === 'User not found') {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Usuário nao encontrado',
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new RpcException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const payload = {id, updateUserDto}
      const user = await lastValueFrom(
        this.natsClient.send({ cmd: 'update.user' }, payload),
      );
      return user;
    } catch (error) {
      if (error.message === 'User not found') {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Usuário nao encontrado',
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new RpcException(error.message);
    }
  }

  //UserRoles

  @Post(':id/role')
  async createUserRole(
    @Param('id') id: string,
    @Body() createUserRoleDto: CreateUserRoleDto,
  ) {
    try {
      const payload = { id, createUserRoleDto };
      const userRole = await lastValueFrom(
        this.natsClient.send({ cmd: 'create.user.role' }, payload),
      );
      return userRole;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @Get('role')
  async findAllUserRole() {
    try {
      const userRoles = await lastValueFrom(this.natsClient.send({cmd:'find.all.user.roles'}, {}))
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message)
    }
  }

  @Get('/role/:id')
  async findOneUserRole(@Param('id') id: string) {
    try {
      const userRoles = await lastValueFrom(this.natsClient.send({cmd:'find.one.user.roles'}, id))
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message)
    }
  }

  @Delete('/role/:id')
  async deleteUserRole(@Param('id') id: string) {
    try {
      const userRoles = await lastValueFrom(this.natsClient.send({cmd:'delete.user.roles'}, id))
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message)
    }
  }

  @Patch('/role/:id')
  async updateUserRole(@Param('id') id: string, updateUserRoleDto: UpdateUserRoleDto) {
    try {
      const payload = { id, updateUserRoleDto }
      const userRoles = await lastValueFrom(this.natsClient.send({cmd:'update.user.roles'}, payload))
      return userRoles;
    } catch (error) {
      throw new RpcException(error.message)
    }
  }
}
