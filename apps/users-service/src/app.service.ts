import { Inject, Injectable } from '@nestjs/common';
import { CreateBaseUserDto, UpdateBaseUserDto } from '@obg/schemas';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
import { User } from 'generated/prisma';
import * as argon2 from 'argon2';

@Injectable()
export class AppService {
  constructor(
    @Inject('USERS_SERVICE_CONSUMER') private client: ClientProxy,
    private prisma: PrismaService,
  ) {}

  async create(data: CreateBaseUserDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingUser = await tx.user.findUnique({
          where: { email: data.email },
        });

        if (existingUser) {
          throw new RpcException('USER_ALREADY_EXISTS');
        }

        const hashedPassword = argon2.hash(data.password);

        const createdUser = tx.user.create({
          data: {
            name: data.name,
            email: data.email,
            role: data.role,
            password: await hashedPassword,
          },
        });

        // Emitir evento de usuário criado

        const { password, ...payload } = data;

        this.client.emit('createdUser', payload);

        return createdUser;
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<{ data: User[]; total: number; totalPages: number }> {
    const MAX_PAGE_SIZE = 1000;
    try {
      page = parseInt(page as unknown as string);
      pageSize = parseInt(pageSize as unknown as string);
      if (pageSize > MAX_PAGE_SIZE) {
        throw new RpcException(
          `O tamanho máximo da página é ${MAX_PAGE_SIZE}.`,
        );
      }

      const total = await this.prisma.user.count(); // Conta o total de registros.
      const skip = (page - 1) * pageSize; // Calcula o número de registros a serem pulados

      const data = await this.prisma.user.findMany({ skip, take: pageSize });

      const totalPages = Math.ceil(total / pageSize);

      return { data, total, totalPages };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: id } });

      if (!user) {
        throw new RpcException('USER_NOT_FOUND');
      }

      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        throw new RpcException('USER_NOT_FOUND');
      }

      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(id: string, data: UpdateBaseUserDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Verificar se o usuário existe.
        const existingUser = await this.prisma.user.findUnique({
          where: { id: id },
        });

        if (!existingUser) {
          throw new RpcException('USER_NOT_FOUND');
        }

        // Verifica se a senha está sendo atualizada
        if (data.password) {
          data.password = await argon2.hash(data.password);
        }

        // Atualiza o usuário
        return tx.user.update({
          where: { id },
          data: { ...data },
        });
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.$transaction(async (tx) => {
        // Verificar se o usuário existe.
        const existingUser = await tx.user.findUnique({ where: { id: id } });

        if (!existingUser) {
          throw new RpcException('USER_NOT_FOUND');
        }

        // Deletar o usuário
        await tx.user.delete({ where: { id } });
      });
      return { message: 'USER_REMOVED_SUCCESSFULLY' };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
