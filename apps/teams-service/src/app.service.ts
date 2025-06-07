import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Team } from 'generated/prisma';
import { CreateTeamDto, UpdateTeamDto } from '@obg/schemas';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject('TEAMS_SERVICE_PROVIDER') private client: ClientProxy,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const createdTeam = await tx.team.create({
          data: {
            name: createTeamDto.name,
            description: createTeamDto.description,
            studentsId: createTeamDto.studentsId,
            teacherId: createTeamDto.teacherId,
            schoolId: createTeamDto.schoolId,
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
      page = parseInt(page as unknown as string);
      pageSize = parseInt(pageSize as unknown as string);
      if (pageSize > MAX_PAGE_SIZE) {
        throw new RpcException('PAGE_SIZE_EXCEEDED');
      }

      const total = await this.prisma.team.count(); // Conta o total de registros
      const skip = (page - 1) * pageSize; // Calcula o número de registros a serem pulados

      const data = await this.prisma.team.findMany({ skip, take: pageSize });

      const totalPages = Math.ceil(total / pageSize); // Calcula o total de páginas

      const result = { data, total, totalPages };

      return result;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<Team> {
    try {
      const team = await this.prisma.team.findUnique({ where: { id: id } });

      if (!team) {
        throw new RpcException('TEAM_NOT_FOUND');
      }
      return team;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const updatedTeam = await tx.team.update({
          where: { id: id },
          data: { ...updateTeamDto },
        });

        this.client.emit('updatedTeam', updatedTeam);

        return updatedTeam;
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingTeam = await tx.team.findUnique({ where: { id: id } });
        if (!existingTeam) {
          throw new RpcException('TEAM_NOT_FOUND');
        }

        await tx.team.delete({ where: { id: id } });

        this.client.emit('deletedTeam', existingTeam);

        return { message: 'TEAM_REMOVED_SUCCESSFULLY' };
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
