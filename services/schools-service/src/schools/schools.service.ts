import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { CreateSchoolDto, School } from '@repo/common/index';
import { RpcException } from '@nestjs/microservices';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly schoolsRepository: Repository<School>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(@Body() createSchoolDto: CreateSchoolDto): Promise<School> {
    try {
      const existingUser = await this.schoolsRepository.findOneBy({inep: createSchoolDto.inep});

      if (existingUser) {
        throw new RpcException('INEP already exists');
      }

      const school = new School({
        ...createSchoolDto,
        id: createId(),
      });

      const createdSchool = await this.entityManager.save(school);
      return createdSchool;
    } catch (error) {
        if (error.message === 'INEP already exists') {
          throw new RpcException('INEP already exists');
        }
        throw new RpcException(error.message);
    }
  }
}
