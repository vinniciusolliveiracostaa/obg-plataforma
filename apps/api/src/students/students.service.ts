import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateStudentUserInputDto,
  UpdateStudentUserInputDto,
} from '@obg/schemas';
import { lastValueFrom } from 'rxjs';
import { UserRole } from '@obg/enums';

@Injectable()
export class StudentsService {
  constructor(@Inject('API_GATEWAY_CONSUMER') private client: ClientProxy) {}

  async create(data: CreateStudentUserInputDto) {
    const payload = {
      ...data,
      role: UserRole.STUDENT,
    };
    return await lastValueFrom(this.client.send('user.create', payload));
  }

  async findAll(page: number, pageSize: number) {
    const payload = { page, pageSize };
    return await lastValueFrom(this.client.send('student.findAll', payload));
  }

  async findOne(id: string) {
    return await lastValueFrom(this.client.send('student.findOne', id));
  }

  async update(id: string, data: UpdateStudentUserInputDto) {
    const payload = {
      ...data,
      role: UserRole.STUDENT,
      id,
    };
    return await lastValueFrom(this.client.send('user.update', payload));
  }

  async remove(id: string) {
    return await lastValueFrom(this.client.send('user.remove', id));
  }
}
