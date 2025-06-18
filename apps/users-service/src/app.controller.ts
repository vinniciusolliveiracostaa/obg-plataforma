import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateBaseUserDto, UpdateBaseUserDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user.create')
  async create(@Payload() data: CreateBaseUserDto) {
    return await this.appService.create(data);
  }

  @MessagePattern('user.findAll')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    return await this.appService.findAll(payload.page, payload.pageSize);
  }

  @MessagePattern('user.findOne')
  async findOne(@Payload() id: string) {
    return await this.appService.findOne(id);
  }

  @MessagePattern('user.findOneByEmail')
  async findOneByEmail(@Payload() email: string) {
    return await this.appService.findOneByEmail(email);
  }

  @MessagePattern('user.update')
  async update(@Payload() payload: { id: string; data: UpdateBaseUserDto }) {
    return await this.appService.update(payload.id, payload.data);
  }

  @MessagePattern('user.remove')
  async delete(@Payload() id: string) {
    return await this.appService.delete(id);
  }
}
