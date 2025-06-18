import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTeamDto, UpdateTeamDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('team.create')
  async create(@Payload() data: CreateTeamDto) {
    return await this.appService.create(data);
  }

  @MessagePattern('team.findAll')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    return await this.appService.findAll(payload.page, payload.pageSize);
  }

  @MessagePattern('team.findOne')
  async findOne(@Payload() id: string) {
    return await this.appService.findOne(id);
  }

  @MessagePattern('team.update')
  async update(@Payload() payload: { id: string; data: UpdateTeamDto }) {
    return await this.appService.update(payload.id, payload.data);
  }

  @MessagePattern('team.remove')
  async remove(@Payload() id: string) {
    return await this.appService.remove(id);
  }
}
