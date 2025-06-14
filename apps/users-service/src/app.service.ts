import { Inject, Injectable } from '@nestjs/common';
import { CreateBaseUserDto, UpdateBaseUserDto } from '@obg/schemas';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserIntegrityService } from './user-integrity.service';
import { UserRole } from '@obg/enums';

@Injectable()
export class AppService {
  constructor(
    @Inject('USERS_SERVICE_CONSUMER') private client: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userIntegrityService: UserIntegrityService,
    private prisma: PrismaService,
  ) {}

  async create(data: CreateBaseUserDto): Promise<User> {
    try {
      // Validações específicas para o tipo de usuário
      await this.userIntegrityService.validateCreate(data);

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

        this.client.emit('user.created', payload);

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
      const ttl = 60 * 60; // 1 hora
      const cacheKey = `users:page=${page}:pageSize=${pageSize}`;
      const cached = await this.cacheManager.get<{
        data: User[];
        total: number;
        totalPages: number;
      }>(cacheKey);

      // Se os dados estiverem no cache, retorna eles.
      if (cached) {
        return cached;
      }

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

      const result = { data, total, totalPages };

      await this.cacheManager.set(cacheKey, result, ttl);

      return result;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const ttl = 60 * 60; // 1 hora
      const cacheKey = `user:${id}`;
      const cached = await this.cacheManager.get<User>(cacheKey);
      // Se o usuário estiver no cache, retorna ele.
      if (cached) {
        return cached;
      }
      const user = await this.prisma.user.findUnique({ where: { id: id } });

      if (!user) {
        throw new RpcException('USER_NOT_FOUND');
      }

      await this.cacheManager.set(cacheKey, user, ttl);

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

  async update(id: string, data: UpdateBaseUserDto): Promise<User> {
    try {
      // Validações específicas para o tipo de usuário
      await this.userIntegrityService.validateUpdate(id, data);

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
        const updatedUser = tx.user.update({
          where: { id },
          data: { ...data },
        });

        // Emitir evento de usuário atualizado
        this.client.emit('user.updated', updatedUser);
        return updatedUser;
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async delete(id: string): Promise<{ message: string; data: string }> {
    try {
      await this.prisma.$transaction(async (tx) => {
        // Verificar se o usuário existe.
        const existingUser = await tx.user.findUnique({ where: { id: id } });

        if (!existingUser) {
          throw new RpcException('USER_NOT_FOUND');
        }
        // Validações específicas para o tipo de usuário
        const data = {
          id: existingUser.id,
          role: existingUser.role as UserRole,
        };
        await this.userIntegrityService.validateRemove(data);
        // Deletar o usuário
        await tx.user.delete({ where: { id } });
        // Emitir evento de usuário removido
        this.client.emit('user.removed', existingUser);
      });
      return { message: 'USER_REMOVED_SUCCESSFULLY', data: id };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
