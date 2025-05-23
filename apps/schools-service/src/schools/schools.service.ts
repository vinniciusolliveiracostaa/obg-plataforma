import { Inject, Injectable } from '@nestjs/common';
import { CreateSchoolDto, UpdateSchoolDto } from '@obg/schemas';
import { School } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class SchoolsService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createOne(createSchoolDto: CreateSchoolDto): Promise<School> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingSchool = await tx.school.findUnique({
          where: { inep: createSchoolDto.inep },
        });

        if (existingSchool) {
          throw new RpcException('SCHOOL_ALREADY_EXISTS');
        }

        return tx.school.create({
          data: {
            ...createSchoolDto,
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
  ): Promise<{ data: School[]; total: number; totalPages: number }> {
    const MAX_PAGE_SIZE = 1000;
    try {
      // Garantir que page e pageSize sejam números inteiros
      page = parseInt(page as unknown as string);
      pageSize = parseInt(pageSize as unknown as string);
      if (pageSize > MAX_PAGE_SIZE) {
        throw new RpcException(
          `O tamanho máximo da página é ${MAX_PAGE_SIZE}.`,
        );
      }

      const cacheKey = `schools:page=${page}:pageSize=${pageSize}`;
      const cached = await this.cacheManager.get<{
        data: School[];
        total: number;
        totalPages: number;
      }>(cacheKey);

      if (cached) {
        return cached;
      }

      const total = await this.prisma.school.count(); // Conta o total de registros
      const skip = (page - 1) * pageSize; // Calcula o número de registros a serem pulados

      const data = await this.prisma.school.findMany({ skip, take: pageSize });

      const totalPages = Math.ceil(total / pageSize);

      const result = { data, total, totalPages };

      // Armazena no cache por 1 minuto
      await this.cacheManager.set(cacheKey, result, 60_000);

      return result;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<School> {
    try {
      const school = await this.prisma.school.findUnique({ where: { id: id } });

      if (!school) {
        throw new RpcException('SCHOOL_NOT_FOUND');
      }

      return school;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async updateOne(
    id: string,
    updateSchoolDto: UpdateSchoolDto,
  ): Promise<School> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Check if the school exists
        const existingSchool = await tx.school.findUnique({
          where: { id: id },
        });

        if (!existingSchool) {
          throw new RpcException('SCHOOL_NOT_FOUND');
        }

        // Update the school
        return tx.school.update({
          where: { id },
          data: { ...updateSchoolDto },
        });
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async removeOne(id: string): Promise<{ message: string }> {
    try {
      await this.prisma.$transaction(async (tx) => {
        // Check if the school exists
        const existingSchool = await tx.school.findUnique({
          where: { id: id },
        });

        if (!existingSchool) {
          throw new RpcException('SCHOOL_NOT_FOUND');
        }

        // Delete the school
        await tx.school.delete({ where: { id } });
      });

      return { message: 'SCHOOL_REMOVED_SUCCESSFULLY' };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
