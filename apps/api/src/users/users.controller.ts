import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateSchoolDto, CreateUserDto, Role, UpdateUserDto } from '@repo/common/index';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    let createdUser: any;
    let roleData: any;

    try {
      // Criar usuário
      createdUser = await lastValueFrom(
        this.natsClient.send({ cmd: 'create_user' }, createUserDto),
      );

      try {
        if (createUserDto.role === Role.SCHOOL) {
          const createSchoolDto = new CreateSchoolDto();
          createSchoolDto.userId = createdUser.id;

          roleData = await lastValueFrom(
            this.natsClient.send({ cmd: 'create_school' }, createSchoolDto),
          );
        }

        const updateUserDto: UpdateUserDto = {
          roleId: roleData ? roleData.id : null,
        };

        const updatedUser = await lastValueFrom(
          this.natsClient.send(
            { cmd: 'update_user_roleId' },
            {
              userId: createdUser.id,
              updateUserDto
            },
          ),
        );

        return {
          message: `Usuário e ${createUserDto.role.toLowerCase()} criados com sucesso`,
          data: updatedUser,
        };

      } catch (roleError) {
        // Se falhar ao criar, apaga o usuário criado
        await lastValueFrom(
          this.natsClient.send({ cmd: 'delete_user' }, createdUser.id),
        );

        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: `Erro ao criar ${createUserDto.role}, usuário removido`,
            error: roleError.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      // Caso o erro seja de usuário já cadastrado
      if (error.message === 'Usuário já cadastrado') {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'Usuário já cadastrado',
            error: error.message,
          },
          HttpStatus.CONFLICT,
        );
      }

      // Erro genérico de criação de usuário
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro ao criar usuário',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getUsers() {
    try {
      const users = await lastValueFrom(
        this.natsClient.send({ cmd: 'get_users' }, {}),
      );

      return {
        message: 'Usuários encontrados com sucesso',
        data: users,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro ao buscar usuários',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    try {
      const user = await lastValueFrom(
        this.natsClient.send({ cmd: 'get_user' }, id),
      );

      let additionalData: any;
      if (user.role === Role.SCHOOL && user.roleId) {
        additionalData = await lastValueFrom(
          this.natsClient.send({ cmd: 'get_school' }, user.roleId),
        );
      }

      return {
        message: 'Usuário encontrado com sucesso',
        data: {
          ...user,
          additionalData,
        },
      };
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Usuário não encontrado',
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro ao buscar usuário',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
