import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { createId } from '@paralleldrive/cuid2';
import { RpcException } from '@nestjs/microservices';

import { Team } from '@repo/entities/index';
import { CreateTeamDto, UpdateTeamDto } from '@repo/dtos/index';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly entityManager: EntityManager,
  ) {}

  // Criar uma equipe

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    try {
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
        throw new RpcException('STUDENTS_NOT_FOUND');
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
        throw new RpcException('STUDENT_NOT_FOUND');
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
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      await this.entityManager.update(Team, id, updateTeamDto);

      const updatedTeam = await this.teamRepository.findOneBy({ id });

      if (!updatedTeam) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      return updatedTeam;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Deletar uma equipe

  async remove(id: string): Promise<void> {
    try {
      const team = await this.teamRepository.findOneBy({ id });

      if (!team) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      await this.entityManager.delete(Team, id);

      return;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
