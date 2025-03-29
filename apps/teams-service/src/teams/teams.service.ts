import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { createId } from '@paralleldrive/cuid2';
import { ClientNats, RpcException } from '@nestjs/microservices';

import { Team } from '@repo/entities/index';
import { CreateTeamDto, UpdateTeamDto } from '@repo/dtos/index';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TeamsService {
  constructor(
    @Inject('SCHOOLS_SERVICE_TEAM_SERVICE_CONSUMER')
    private readonly client: ClientNats,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly entityManager: EntityManager,
  ) {}

  // Criar uma equipe

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    try {
      const studentsExists = await lastValueFrom(
        this.client.send('findOneStudent', createTeamDto.students),
      );
      if (studentsExists.length !== createTeamDto.students.length) {
        throw new RpcException('STUDENTS_NOT_FOUND');
      }
      const team = new Team({
        ...createTeamDto,
        id: createId(),
      });

      const createdTeam = await this.entityManager.save(team);

      return createdTeam;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Listar todos as equipes

  async findAll(): Promise<Team[]> {
    try {
      const teams = await this.teamRepository.find();

      if (teams.length === 0) {
        throw new RpcException('TEAMS_NOT_FOUND');
      }

      return teams;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Listar uma equipe pelo ID

  async findOne(id: string): Promise<Team> {
    try {
      const team = await this.teamRepository.findOneBy({ id });

      if (!team) {
        throw new RpcException('TEAM_NOT_FOUND');
      }

      return team;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Atualizar uma equipe

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    try {
      const team = await this.teamRepository.findOneBy({ id });

      if (!team) {
        throw new RpcException('TEAM_NOT_FOUND');
      }

      // Verifica se o estudante existe
      if (updateTeamDto.students) {
        const studentsExists = await lastValueFrom(
          this.client.send('findOneStudent', updateTeamDto.students),
        );
        if (studentsExists.length !== updateTeamDto.students.length) {
          throw new RpcException('STUDENTS_NOT_FOUND');
        }
      }

      // Verifica se a escola existe
      if (updateTeamDto.schoolId) {
        const schoolExists = await lastValueFrom(
          this.client.send('findOneSchool', updateTeamDto.schoolId),
        );
        if (!schoolExists) {
          throw new RpcException('SCHOOL_NOT_FOUND');
        }
      }

      await this.entityManager.update(Team, id, updateTeamDto);

      const updatedTeam = await this.teamRepository.findOneBy({ id });

      if (!updatedTeam) {
        throw new RpcException('TEAM_NOT_FOUND');
      }

      return updatedTeam;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Deletar uma equipe

  async remove(id: string): Promise<DeleteResult> {
    try {
      const team = await this.teamRepository.findOneBy({ id });

      if (!team) {
        throw new RpcException('TEAM_NOT_FOUND');
      }

      const deletedTeam = await this.entityManager.delete(Team, id);

      return deletedTeam;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
