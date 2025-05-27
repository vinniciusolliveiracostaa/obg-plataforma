import { Inject, Injectable } from '@nestjs/common';
import { CreateBaseUserDto, UpdateBaseUserDto } from '@obg/schemas';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
import { User } from 'generated/prisma';
import * as argon2 from 'argon2';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject('USERS_SERVICE_PROVIDER') private client: ClientProxy,
  ) {}

  async create(createBaseUserDto: CreateBaseUserDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingUser = await tx.user.findUnique({
          where: { email: createBaseUserDto.email },
        });

        if (existingUser) {
          throw new RpcException('USER_ALREADY_EXISTS');
        }

        const hashedPassword = argon2.hash(createBaseUserDto.password);

        const createdUser = tx.user.create({
          data: {
            name: createBaseUserDto.name,
            email: createBaseUserDto.email,
            role: createBaseUserDto.role,
            password: await hashedPassword,
          },
        });

        // Emitir evento de usuário criado

        const { password, ...teacherUserDto } = createBaseUserDto;

        this.client.emit('createdUser', teacherUserDto);

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

      const total = await this.prisma.user.count(); // Conta o total de registros
      const skip = (page - 1) * pageSize; // Calcula o número de registros a serem pulados

      const data = await this.prisma.user.findMany({ skip, take: pageSize });

      const totalPages = Math.ceil(total / pageSize);

      const result = { data, total, totalPages };

      return result;
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
      console.log(email);
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

  async update(id: string, updateBaseUserDto: UpdateBaseUserDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Verificar se o usuário existe
        const existingUser = await this.prisma.user.findUnique({
          where: { id: id },
        });

        if (!existingUser) {
          throw new RpcException('USER_NOT_FOUND');
        }

        // Verifica se a senha está sendo atualizada
        if (updateBaseUserDto.password) {
          updateBaseUserDto.password = await argon2.hash(
            updateBaseUserDto.password,
          );
        }

        // Atualiza o usuário
        return tx.user.update({
          where: { id },
          data: { ...updateBaseUserDto },
        });
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      await this.prisma.$transaction(async (tx) => {
        // Verificar se o usuário existe
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