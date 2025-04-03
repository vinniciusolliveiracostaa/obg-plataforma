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
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '@repo/dtos/index';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('GATEWAY_CONSUMER') private client: ClientNats) {}

  async onModuleInit() {
    this.client.connect();
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um usuário',
    description: 'Cria um novo usuário no sistema',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await lastValueFrom(this.client.send('createUser', createUserDto));
    } catch (error) {
      switch (error.message) {
        case 'USER_ALREADY_EXISTS':
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              message: 'Usuário já existe',
              error: error.message,
            },
            HttpStatus.CONFLICT,
          );
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar um usuário',
    description: 'Busca um usuário pelo ID',
  })
  async findOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('findOneUser', id));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os usuários',
    description: 'Busca todos os usuários cadastrados no sistema',
  })
  async findAll() {
    try {
      return await lastValueFrom(this.client.send('findAllUsers', {}));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
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
    description: 'Atualiza um usuário pelo ID',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const payload = { id, updateUserDto };
      return await lastValueFrom(this.client.send('updateUser', payload));
    } catch (error) {
      switch (error.message) {
        case 'USER_ALREADY_EXISTS':
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              message: 'Usuário já existe',
              error: error.message,
            },
            HttpStatus.CONFLICT,
          );
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover um usuário',
    description: 'Remove um usuário pelo ID',
  })
  async remove(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('removeUser', id));
    } catch (error) {
      switch (error.message) {
        case 'USER_ALREADY_EXISTS':
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              message: 'Usuário já existe',
              error: error.message,
            },
            HttpStatus.CONFLICT,
          );
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
