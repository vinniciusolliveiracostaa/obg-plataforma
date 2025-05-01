import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Team } from 'generated/prisma';
import { ClientNats, RpcException } from '@nestjs/microservices';
// noinspection ES6PreferShortImport
import { CreateTeamDto, UpdateTeamDto } from '@repo/dtos/index';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TeamsService {
  constructor(
    @Inject('TEAMS_SERVICE_CONSUMER') private client: ClientNats,
    private prisma: PrismaService,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    try {
      return await this.prisma.$transaction(async (prismaTransaction) => {
        // Validações em paralelo
        await Promise.all([
          this.checkTeamNameExists(createTeamDto.name),
          this.checkSchoolIdExists(createTeamDto.schoolId),
          this.checkTeacherIdExists(createTeamDto.teacherId),
          this.checkStudentsIdExists(createTeamDto.studentsId),
        ]);

        // Criação da equipe
        return prismaTransaction.team.create({ data: { ...createTeamDto } });
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
      const team = await this.prisma.team.findUnique({ where: { id: id } });
      if (!team) {
        throw new RpcException('TEAM_NOT_FOUND');
      }
      await this.prisma.team.delete({ where: { id } });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  private async checkTeamNameExists(name: string): Promise<void> {
    const existingTeam = await this.prisma.team.findFirst({ where: { name } });
    if (existingTeam) {
      throw new RpcException('NAME_ALREADY_EXISTS');
    }
  }
  private async checkSchoolIdExists(schoolId: string): Promise<void> {
    try {
      await lastValueFrom(this.client.send('findOneSchool', schoolId));
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  private async checkTeacherIdExists(teacherId: string): Promise<void> {
    try {
      await lastValueFrom(this.client.send('findOneTeacher', teacherId));
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  private async checkStudentsIdExists(studentsId: string[]): Promise<void> {
    try {
      await lastValueFrom(this.client.send('findManyStudents', studentsId));
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
