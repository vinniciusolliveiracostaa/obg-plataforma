import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTeamDto, UpdateTeamDto } from '@obg/schemas';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TeamsService {
  constructor(@Inject('API_GATEWAY_CONSUMER') private client: ClientProxy) {}

  async create(data: CreateTeamDto) {
    return await lastValueFrom(this.client.send('createOneTeam', data));
  }

  async findAll(page: number, pageSize: number) {
    const payload = { page, pageSize };
    return await lastValueFrom(this.client.send('findAllTeams', payload));
  }

  async findOne(id: string) {
    return await lastValueFrom(this.client.send('findOneTeam', id));
  }

  async update(id: string, data: UpdateTeamDto) {
    const payload = { id, data };
    return await lastValueFrom(this.client.send('updateOneTeam', payload));
  }

  async remove(id: string) {
    return await lastValueFrom(this.client.send('removeOneTeam', id));
  }
}
