import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { CreateSchoolDto, School } from '@repo/common/index';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SchoolsService {
    constructor(
        @InjectRepository(School)
        private readonly schoolRepository: Repository<School>,
        private readonly entityManager: EntityManager
    ) {}

    async createSchool(createSchoolDto: CreateSchoolDto): Promise<School> {
        const school = new School({
            ...createSchoolDto,
            userId: createSchoolDto.userId,
        });

        const savedSchool = await this.entityManager.save(school);

        return savedSchool;
    }

    async getSchool(id: string): Promise<School> {
        const school = await this.schoolRepository.findOneBy({ id });

        if (!school) {
            throw new RpcException('Escola não encontrada');
        }

        return {
            ...school,
            userId: undefined,
            id: undefined,
        };
    }
}
