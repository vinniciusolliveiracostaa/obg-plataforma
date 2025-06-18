import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBaseUserDto, UpdateBaseUserDto } from '@obg/schemas';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject('API_GATEWAY_CONSUMER') private client: ClientProxy) {}

  async create(data: CreateBaseUserDto) {
    return await lastValueFrom(this.client.send('user.create', data));
  }

  async findAll(page: number, pageSize: number) {
    const payload = { page, pageSize };
    return await lastValueFrom(this.client.send('user.findAll', payload));
  }

  async findOne(id: string) {
    return await lastValueFrom(this.client.send('user.findOne', id));
  }

  async update(id: string, data: UpdateBaseUserDto) {
    const payload = { id, data };
    return await lastValueFrom(this.client.send('user.update', payload));
  }

  async remove(id: string) {
    return await lastValueFrom(this.client.send('user.remove', id));
  }
}
