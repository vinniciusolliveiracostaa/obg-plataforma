import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { createId } from '@paralleldrive/cuid2';

import { School } from '@repo/entities/index';
import { CreateSchoolDto, UpdateSchoolDto } from '@repo/dtos/index';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    private readonly entityManager: EntityManager,
  ) {}

  // Criar uma escola

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    try {
      const school = new School({
        ...createSchoolDto,
        id: createId(),
      });

      const createdSchool = await this.entityManager.save(school);

      return createdSchool;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Listar todas as escolas

  async findAll(): Promise<School[]> {
    try {
      const schools = await this.schoolRepository.find();

      if (schools.length === 0) {
        throw new RpcException('SCHOOLS_NOT_FOUND');
      }

      return schools;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Listar uma escola pelo ID

  async findOne(id: string): Promise<School> {
    try {
      const school = await this.schoolRepository.findOneBy({ id });

      if (!school) {
        throw new RpcException('SCHOOL_NOT_FOUND');
      }

      return school;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Atualizar uma escola

  async update(id: string, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    try {
      const school = await this.schoolRepository.findOneBy({ id });

      if (!school) {
        throw new RpcException('SCHOOL_NOT_FOUND');
      }

      await this.entityManager.update(School, id, updateSchoolDto);

      const updatedSchool = await this.schoolRepository.findOneBy({ id });
      if (!updatedSchool) {
        throw new RpcException('SCHOOL_NOT_FOUND');
      }

      return updatedSchool;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Deletar uma escola

  async remove(id: string): Promise<void> {
    try {
      const school = this.schoolRepository.findOneBy({ id });

      if (!school) {
        throw new RpcException('SCHOOL_NOT_FOUND');
      }

      await this.entityManager.delete(School, id);

      return;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
