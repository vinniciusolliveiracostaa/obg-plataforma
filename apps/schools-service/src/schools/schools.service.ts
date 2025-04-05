import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DeleteResult, EntityManager } from 'typeorm';
import { createId } from '@paralleldrive/cuid2';

import { School } from '@repo/entities/index';
import { CreateSchoolDto, UpdateSchoolDto } from '@repo/dtos/index';

@Injectable()
export class SchoolsService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createSchoolDto: CreateSchoolDto) {
    try {
      return this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await this.findOneByInep(createSchoolDto.email);
          await this.findOneByInep(createSchoolDto.inep);
          await this.findOneByPhone(createSchoolDto.phone);

          const school = new School({
            ...createSchoolDto,
            id: createId(),
          });

          const newSchool = await transactionalEntityManager.save(
            School,
            school,
          );

          if (!newSchool) {
            throw new RpcException('SCHOOL_NOT_CREATED');
          }

          return newSchool;
        },
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const school = await this.entityManager.findOneBy(School, { id });

      if (!school) {
        throw new RpcException('SCHOOL_NOT_FOUND');
      }

      return school;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll() {
    try {
      const schools = await this.entityManager.find(School, {});

      return schools || [];
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    try {
      return this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await this.findOne(id);

          await transactionalEntityManager.update(School, id, updateSchoolDto);

          const updatedUser = await this.findOne(id);

          return updatedUser;
        },
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string) {
    try {
      return this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await this.findOne(id);

          const deletedResult = await transactionalEntityManager.delete(
            School,
            id,
          );

          return deletedResult;
        },
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  private async findOneByInep(inep: string) {
    try {
      const school = await this.entityManager.findOneBy(School, { inep });

      if (school) {
        return new RpcException('SCHOOL_ALREADY_EXISTS');
      }
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  private async findOneByEmail(email: string) {
    try {
      const school = await this.entityManager.findOneBy(School, { email });

      if (school) {
        return new RpcException('SCHOOL_ALREADY_EXISTS');
      }
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  private async findOneByPhone(phone: string) {
    try {
      const school = await this.entityManager.findOneBy(School, { phone });

      if (school) {
        return new RpcException('SCHOOL_ALREADY_EXISTS');
      }
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
