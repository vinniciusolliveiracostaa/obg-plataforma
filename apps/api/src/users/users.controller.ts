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
import { ClientNats } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';

import { CreateUserDto, UpdateUserDto } from '@repo/dtos/index';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE_GATEWAY_CONSUMER') private client: ClientNats,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um usuário',
    description: 'Cria um novo usuário no sistema',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await lastValueFrom(
        this.client.send('createUser', createUserDto),
      );
      return user;
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Erro Interno do Servidor',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuários',
    description: 'Retorna uma lista de todos os usuários cadastrados',
  })
  async findAll() {
    try {
      const users = await lastValueFrom(this.client.send('findAllUsers', {}));
      return users;
    } catch (error) {
      switch (error.message) {
        case 'USERS_NOT_FOUND':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Nenhum Usuário encontrado',
              error: error.message,
            },
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Erro Interno do Servidor',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listar um usuário',
    description: 'Retorna um usuário específico pelo ID',
  })
  async findOne(@Param('id') id: string) {
    try {
      const user = await lastValueFrom(this.client.send('findOneUser', id));
      return user;
    } catch (error) {
      switch (error.message) {
        case 'USER_NOT_FOUND':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Usuário não encontrado',
              error: error.message,
            },
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Erro Interno do Servidor',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um usuário',
    description: 'Atualiza os dados de um usuário existente',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const payload = { id, updateUserDto };
      const user = await lastValueFrom(this.client.send('updateUser', payload));
      return user;
    } catch (error) {
      switch (error.message) {
        case 'USER_NOT_FOUND':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Usuário não encontrado',
              error: error.message,
            },
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Erro Interno do Servidor',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um usuário',
    description: 'Remove um usuário do sistema pelo ID',
  })
  async remove(@Param('id') id: string) {
    try {
      const user = await lastValueFrom(this.client.send('removeUser', id));
      return user;
    } catch (error) {
      switch (error.message) {
        case 'USER_NOT_FOUND':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Usuário não encontrado',
              error: error.message,
            },
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Erro Interno do Servidor',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
