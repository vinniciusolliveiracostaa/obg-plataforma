import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { StudentUserDto } from '@obg/schemas';
import { PrismaService } from './prisma/prisma.service';
import { Student } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(
    @Inject('STUDENTS_SERVICE_CONSUMER') private client: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async create(data: StudentUserDto): Promise<Student> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        return tx.student.create({
          data: {
            id: data.id,
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            nis: data.nis,
            motherName: data.motherName,
            phone: data.phone,
            birthDate: data.birthDate,
            levelOfEducation: data.levelOfEducation,
            gender: data.gender,
            colorRace: data.colorRace,
            specialCategories: data.specialCategories,
            schoolId: data.schoolId,
            teamId: data.teamId,
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
  ): Promise<{ data: Student[]; total: number; totalPages: number }> {
    const MAX_PAGE_SIZE = 1000;
    try {
      const ttl = 60 * 60; // 1 hora
      const cacheKey = `students:page=${page}:pageSize=${pageSize}`;
      const cached = await this.cacheManager.get<{
        data: Student[];
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

      const total = await this.prisma.student.count(); // Contar o total de registros.
      const skip = (page - 1) * pageSize; // Calcula o número de registros a serem pulados.

      const data = await this.prisma.student.findMany({ skip, take: pageSize });

      const totalPages = Math.ceil(total / pageSize);

      const result = { data, total, totalPages };

      // Armazenar o resultado no cache.
      await this.cacheManager.set(cacheKey, result, ttl);

      return result;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOneByEmail(email: string): Promise<Student> {
    try {
      const ttl = 60 * 60; // 1 hora
      const cacheKey = `student:email:${email}`;

      const cached = await this.cacheManager.get<Student>(cacheKey);
      // Verifica se o estudante já está no cache

      if (cached) {
        return cached;
      }

      const student = await this.prisma.student.findUnique({
        where: { email },
      });

      if (!student) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      await this.cacheManager.set(cacheKey, student, ttl);

      return student;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<Student> {
    try {
      const ttl = 60 * 60; // 1 hora
      const cacheKey = `student:${id}`;

      const cached = await this.cacheManager.get<Student>(cacheKey);
      // Verifica se o estudante já está no cache

      if (cached) {
        return cached;
      }

      const student = await this.prisma.student.findUnique({ where: { id } });

      if (!student) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      await this.cacheManager.set(cacheKey, student, ttl);

      return student;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(data: StudentUserDto): Promise<Student> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        return tx.student.update({
          where: { id: data.id },
          data: {
            id: data.id,
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            nis: data.nis,
            motherName: data.motherName,
            phone: data.phone,
            birthDate: data.birthDate,
            levelOfEducation: data.levelOfEducation,
            gender: data.gender,
            colorRace: data.colorRace,
            specialCategories: data.specialCategories,
            schoolId: data.schoolId,
            teamId: data.teamId,
          },
        });
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(
    data: StudentUserDto,
  ): Promise<{ message: string; data: string }> {
    try {
      const cacheKey = `student:${data.id}`;
      await this.prisma.$transaction(async (tx) => {
        await tx.student.delete({
          where: { id: data.id },
        });
      });
      // Remove o estudante do cache
      await this.cacheManager.del(cacheKey);
      return { message: 'TEAM_REMOVED_SUCCESSFULLY', data: data.id };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
