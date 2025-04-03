import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { createId } from '@paralleldrive/cuid2';

import { School } from '@repo/entities/index';
import { CreateSchoolDto, UpdateSchoolDto } from '@repo/dtos/index';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createSchoolDto: CreateSchoolDto) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const existingSchool = await this.findOne(createSchoolDto.inep);
        if (existingSchool) {
          throw new RpcException('SCHOOL_ALREADY_EXISTS');
        }

        const school = new School({
          ...createSchoolDto,
          id: createId(),
        });
        const newSchool = await transactionalEntityManager.save(School, school);
        if (!newSchool) {
          throw new RpcException('SCHOOL_NOT_CREATED');
        }
        return newSchool;
      },
    );
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        // Verifica se a escola existe
        const existingSchool = await this.findOne(id);
        if (!existingSchool) {
          throw new RpcException('SCHOOL_NOT_FOUND');
        }

        // Atualiza a escola
        await transactionalEntityManager.update(School, id, updateSchoolDto);

        // Retorna a escola atualizada
        return this.findOne(id);
      },
    );
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        // Verifica se a escola existe
        const school = await this.findOne(id);
        if (!school) {
          throw new RpcException('SCHOOL_NOT_FOUND');
        }

        // Remove a escola
        const deleteResult = await transactionalEntityManager.delete(
          School,
          id,
        );

        if (deleteResult.affected === 0) {
          throw new RpcException('SCHOOL_NOT_DELETED');
        }

        return deleteResult;
      },
    );
  }

  async findAll(): Promise<School[]> {
    const schools = this.schoolRepository.find();
    if (!schools) {
      throw new RpcException('SCHOOL_NOT_FOUND');
    }
    return schools || [];
  }

  async findOne(id: string): Promise<School> {
    try {
      // Verifica se a escola existe
      const school = await this.schoolRepository.findOneBy({ id });

      if (!school) {
        throw new RpcException('SCHOOL_NOT_FOUND');
      }
      return school;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
