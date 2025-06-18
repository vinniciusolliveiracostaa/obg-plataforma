import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Team } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from '@obg/schemas';

@Injectable()
export class AppService {
  constructor(
    @Inject('TEAMS_SERVICE_CONSUMER') private client: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async create(data: CreateTeamDto): Promise<Team> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const createdTeam = await tx.team.create({
          data: {
            name: data.name,
            description: data.description,
            studentsId: data.studentsId,
            teacherId: data.teacherId,
            schoolId: data.schoolId,
          },
        });

        this.client.emit('createdTeam', createdTeam);

        return createdTeam;
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<{ data: Team[]; total: number; totalPages: number }> {
    const MAX_PAGE_SIZE = 1000;
    try {
      const ttl = 60 * 60; // 1 hora
      const cacheKey = `teams:page=${page}:pageSize=${pageSize}`;
      const cached = await this.cacheManager.get<{
        data: Team[];
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
        throw new RpcException('PAGE_SIZE_EXCEEDED');
      }

      const total = await this.prisma.team.count(); // Conta o total de registros.
      const skip = (page - 1) * pageSize; // Calcula o número de registros a serem pulados

      const data = await this.prisma.team.findMany({ skip, take: pageSize });

      const totalPages = Math.ceil(total / pageSize); // Calcula o total de páginas

      const result = { data, total, totalPages };

      // Armazenar o resultado no cache.
      await this.cacheManager.set(cacheKey, result, ttl);

      return result;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<Team> {
    try {
      const ttl = 60 * 60; // 1 hora
      const cacheKey = `team:${id}`;

      const cached = await this.cacheManager.get<Team>(cacheKey);
      // Se os dados estiverem no cache, retorna eles.
      if (cached) {
        return cached;
      }

      const team = await this.prisma.team.findUnique({ where: { id: id } });

      if (!team) {
        throw new RpcException('TEAM_NOT_FOUND');
      }

      await this.cacheManager.set(cacheKey, team, ttl);

      return team;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(id: string, data: UpdateTeamDto): Promise<Team> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const updatedTeam = await tx.team.update({
          where: { id: id },
          data: { ...data },
        });

        this.client.emit('updatedTeam', updatedTeam);

        return updatedTeam;
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string): Promise<{ message: string; data: string }> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingTeam = await tx.team.findUnique({ where: { id: id } });
        if (!existingTeam) {
          throw new RpcException('TEAM_NOT_FOUND');
        }

        await tx.team.delete({ where: { id: id } });

        this.client.emit('deletedTeam', existingTeam);

        return { message: 'TEAM_REMOVED_SUCCESSFULLY', data: id };
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
