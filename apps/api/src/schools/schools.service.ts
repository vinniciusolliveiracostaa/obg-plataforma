import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateSchoolDto, UpdateSchoolDto } from '@obg/schemas';

@Injectable()
export class SchoolsService {
  constructor(@Inject('API_GATEWAY_CONSUMER') private client: ClientProxy) {}

  async create(data: CreateSchoolDto) {
    return await lastValueFrom(this.client.send('createOneSchool', data));
  }

  async findAll(page: number, pageSize: number) {
    const payload = { page, pageSize };
    return await lastValueFrom(this.client.send('findAllSchools', payload));
  }

  async findOne(id: string) {
    return await lastValueFrom(this.client.send('findOneSchool', id));
  }

  async update(id: string, data: UpdateSchoolDto) {
    const payload = { id, data };
    return await lastValueFrom(this.client.send('updateOneSchool', payload));
  }

  async remove(id: string) {
    return await lastValueFrom(this.client.send('removeOneSchool', id));
  }
}
