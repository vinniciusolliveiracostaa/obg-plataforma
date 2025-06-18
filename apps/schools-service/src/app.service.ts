import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
import { CreateSchoolDto, UpdateSchoolDto } from '@obg/schemas';
import { ChunkMetadata } from '@obg/interfaces';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { School } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(
    @Inject('SCHOOLS_SERVICE_CONSUMER') private client: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async create(data: CreateSchoolDto): Promise<School> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingSchool = await tx.school.findUnique({
          where: { inep: data.inep },
        });

        if (existingSchool) {
          throw new RpcException('SCHOOL_ALREADY_EXISTS');
        }

        return tx.school.create({
          data: {
            ...data,
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
      // Garantir que page e pageSize sejam números inteiros.
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

      page = parseInt(page as unknown as string);
      pageSize = parseInt(pageSize as unknown as string);

      if (pageSize > MAX_PAGE_SIZE) {
        throw new RpcException(
          `O tamanho máximo da página é ${MAX_PAGE_SIZE}.`,
        );
      }

      const total = await this.prisma.school.count(); // Conta o total de registros.
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

  async findMany(schoolsId: string[]): Promise<School[]> {
    try {
      if (!Array.isArray(schoolsId) || schoolsId.length === 0) {
        throw new RpcException('SCHOOL_IDS_MUST_BE_A_NON_EMPTY_ARRAY');
      }

      const schools = await this.prisma.school.findMany({
        where: { id: { in: schoolsId } },
      });

      const foundIds = schools.map((school) => school.id);
      const missingIds = schoolsId.filter((id) => !foundIds.includes(id));

      if (missingIds.length > 0) {
        throw new RpcException(`SCHOOLS_NOT_FOUND: ${missingIds.join(', ')}`);
      }

      return schools;
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

  async update(id: string, data: UpdateSchoolDto): Promise<School> {
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
          data: { ...data },
        });
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string): Promise<{ message: string; data: string }> {
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

      return { message: 'SCHOOL_REMOVED_SUCCESSFULLY', data: id };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async uploadCsv(metadata: ChunkMetadata, data: string) {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
