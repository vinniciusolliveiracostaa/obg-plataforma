import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateSchoolDto } from '@repo/common/index';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SchoolsService {
    constructor(
        @Inject('SCHOOLS_CONSUMER') private natsClient: ClientProxy
    ) {}

    async create(createSchoolDto: CreateSchoolDto) {
        try {
            const school = await lastValueFrom(
                this.natsClient.send({ cmd: 'create.school' }, createSchoolDto)
            )
            return school;
        } catch (error) {
            throw new RpcException(error.message);
        }
    }
}
