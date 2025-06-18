import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateTeacherUserInputDto,
  UpdateTeacherUserInputDto,
} from '@obg/schemas';
import { lastValueFrom } from 'rxjs';
import { UserRole } from '@obg/enums';

@Injectable()
export class TeachersService {
  constructor(@Inject('API_GATEWAY_CONSUMER') private client: ClientProxy) {}

  async create(data: CreateTeacherUserInputDto) {
    const payload = {
      ...data,
      role: UserRole.TEACHER,
    };
    return await lastValueFrom(this.client.send('user.create', payload));
  }

  async findAll(page: number, pageSize: number) {
    const payload = { page, pageSize };
    return await lastValueFrom(this.client.send('teacher.findAll', payload));
  }

  async findOne(id: string) {
    return await lastValueFrom(this.client.send('teacher.findOne', id));
  }

  async update(id: string, data: UpdateTeacherUserInputDto) {
    const payload = {
      ...data,
      role: UserRole.TEACHER,
      id,
    };
    return await lastValueFrom(this.client.send('user.update', payload));
  }

  async remove(id: string) {
    return await lastValueFrom(this.client.send('user.remove', id));
  }
}
