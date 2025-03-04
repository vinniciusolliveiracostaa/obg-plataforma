import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { School } from '@repo/entities/index';
import { createId } from '@paralleldrive/cuid2';
import { RpcException } from '@nestjs/microservices';
import { CreateSchoolDto } from '@repo/dtos/index';

@Injectable()
export class SchoolsService {
    constructor(
        @InjectRepository(School)
        private readonly schoolsRepository: Repository<School>,
        private readonly entityManager: EntityManager
    ) {}

    async create(createSchoolDto: CreateSchoolDto): Promise<School> {
        try {
            if (!createSchoolDto.inep) {
                throw new RpcException('Missing inep');
            }
            
            const existingSchool = await this.schoolsRepository.findOne({
                where: {
                    inep: createSchoolDto.inep,
                },
            })

            if (existingSchool) {
                throw new RpcException('School already exists');
            }
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
}
