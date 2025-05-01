import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Team } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';
// noinspection ES6PreferShortImport
import { CreateTeamDto, UpdateTeamDto } from '@repo/dtos/index';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    try {
      const existingTeam = await this.prisma.team.findFirst({
        where: {
          OR: [{ name: createTeamDto.name }],
        },
      });
      if (existingTeam) {
        if (existingTeam.name === createTeamDto.name) {
          throw new RpcException('NAME_ALREADY_EXISTS');
        }
      }
      return this.prisma.team.create({
        data: { ...createTeamDto },
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(): Promise<Team[]> {
    try {
      return this.prisma.team.findMany({});
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<Team> {
    try {
      const team = await this.prisma.team.findUnique({ where: { id } });
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
      const existingTeam = await this.prisma.team.findFirst({
        where: {
          OR: [{ name: updateTeamDto.name }],
        },
      });
      if (existingTeam) {
        if (existingTeam.name === updateTeamDto.name) {
          throw new RpcException('NAME_ALREADY_EXISTS');
        }
      }
      return this.prisma.team.update({
        where: { id },
        data: { ...updateTeamDto },
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const team = await this.prisma.team.findUnique({ where: { id } });
      if (!team) {
        throw new RpcException('TEAM_NOT_FOUND');
      }
      await this.prisma.team.delete({ where: { id } });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
