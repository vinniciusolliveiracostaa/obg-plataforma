import { Inject, Injectable } from '@nestjs/common';
import { UserRole, User } from 'generated/prisma';
import { CreateUserDto, UpdateUserDto } from '@repo/dtos';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @Inject('USERS_SERVICE_PROVIDER') private client: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    let createdUser: User;
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingUser = await tx.user.findUnique({
          where: { email: createUserDto.email },
        });

        if (existingUser) {
          throw new RpcException('USER_ALREADY_EXISTS');
        }
        createdUser = await tx.user.create({
          data: {
            email: createUserDto.email,
            name: createUserDto.name,
            role: createUserDto.role as UserRole,
            password: await argon2.hash(createUserDto.password),
          },
        });
        // Emitindo evento de usuário criado
        this.client.emit('createdUser', createdUser);
        return createdUser;
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new RpcException('USER_NOT_FOUND');
      }

      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Verifica se o usuário existe
        const existingUser = await tx.user.findUnique({
          where: { id: id },
        });

        if (!existingUser) {
          throw new RpcException('USER_NOT_FOUND');
        }

        const { password, ...rest } = updateUserDto;

        const data = {
          ...rest,
          ...(password && { password: await argon2.hash(password) }),
        };

        // Atualiza o usuário
        return tx.user.update({
          where: { id },
          data,
        });
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string): Promise<Omit<User, 'password'>> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Verifica se o usuário existe
        const existingUser = await tx.user.findUnique({
          where: { id: id },
        });

        if (!existingUser) {
          throw new RpcException('USER_NOT_FOUND');
        }

        // Deleta o usuário
        return tx.user.delete({ where: { id } });
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
