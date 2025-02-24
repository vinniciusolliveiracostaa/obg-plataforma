import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserDto, IsPublic, Role, Roles } from '@repo/common/index';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_CONSUMER') private natsClient: ClientProxy) {}

  // Inicializa o client NATS no momento que o módulo é carregado
  onModuleInit() {
    this.natsClient.connect();
  }

  @IsPublic() // temporario
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await lastValueFrom(
        this.natsClient.send({ cmd: 'create.user' }, createUserDto),
      );
      return createdUser;
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

      if (error.message === 'INEP already exists') {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'INEP already exists!',
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

   @IsPublic() // temporiro
  @Get()
  async findAll() {
    try {
      const users = await lastValueFrom(
        this.natsClient.send({ cmd: 'find.all.users' }, {}),
      );
      return users;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @Get('admin')
  @Roles(Role.ADMIN)
  async admin() {
    return { message: 'Is Admin' }
  }

  @Get('school')
  @Roles(Role.SCHOOL)
  async school() {
    return { message: 'Is School' }
  }
}
