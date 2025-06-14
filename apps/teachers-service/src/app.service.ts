import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Teacher } from '@prisma/client';
import { TeacherUserDto } from '@obg/schemas';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    @Inject('TEACHERS_SERVICE_CONSUMER') private client: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async create(data: TeacherUserDto): Promise<Teacher> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        return tx.teacher.create({
          data: {
            id: data.id,
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            phone: data.phone,
            birthDate: data.birthDate,
            gender: data.gender,
            colorRace: data.colorRace,
            specialCategories: data.specialCategories,
            schoolsId: data.schoolsId,
          },
        });
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<{ data: Teacher[]; total: number; totalPages: number }> {
    const MAX_PAGE_SIZE = 1000;
    try {
      const ttl = 60 * 60; // 1 hora
      const cacheKey = `teachers:page=${page}:pageSize=${pageSize}`;
      const cached = await this.cacheManager.get<{
        data: Teacher[];
        total: number;
        totalPages: number;
      }>(cacheKey);

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

      const total = await this.prisma.teacher.count(); // Contar o total de registros.
      const skip = (page - 1) * pageSize; // Calcula o número de registros a serem pulados.

      const data = await this.prisma.teacher.findMany({ skip, take: pageSize });

      const totalPages = Math.ceil(total / pageSize);

      const result = { data, total, totalPages };

      // Armazenar o resultado no cache.
      await this.cacheManager.set(cacheKey, result, ttl);

      return result;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOneByEmail(email: string): Promise<Teacher> {
    try {
      const ttl = 60 * 60; // 1 hora
      const cacheKey = `teacher:email:${email}`;

      const cached = await this.cacheManager.get<Teacher>(cacheKey);
      // Verifica se o professor já está no cache.

      if (cached) {
        return cached;
      }

      const teacher = await this.prisma.teacher.findUnique({
        where: { email },
      });

      if (!teacher) {
        throw new RpcException('TEACHER_NOT_FOUND');
      }

      await this.cacheManager.set(cacheKey, teacher, ttl);

      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<Teacher> {
    try {
      const ttl = 60 * 60; // 1 hora
      const cacheKey = `teacher:${id}`;

      const cached = await this.cacheManager.get<Teacher>(cacheKey);

      // Verifica se o professor já está no cache.
      if (cached) {
        return cached;
      }

      const teacher = await this.prisma.teacher.findUnique({ where: { id } });

      if (!teacher) {
        throw new RpcException('TEACHER_NOT_FOUND');
      }

      await this.cacheManager.set(cacheKey, teacher, ttl);

      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(data: TeacherUserDto): Promise<Teacher> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        return tx.teacher.update({
          where: { id: data.id },
          data: {
            id: data.id,
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            phone: data.phone,
            birthDate: data.birthDate,
            gender: data.gender,
            colorRace: data.colorRace,
            specialCategories: data.specialCategories,
            schoolsId: data.schoolsId,
          },
        });
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(
    data: TeacherUserDto,
  ): Promise<{ message: string; data: string }> {
    try {
      const cacheKey = `teacher:${data.id}`;
      await this.prisma.$transaction(async (tx) => {
        return tx.teacher.delete({
          where: { id: data.id },
        });
      });
      // Remove o professor do cache
      await this.cacheManager.del(cacheKey);
      return { message: 'TEAM_REMOVED_SUCCESSFULLY', data: data.id };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
