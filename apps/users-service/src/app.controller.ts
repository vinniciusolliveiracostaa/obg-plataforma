import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateBaseUserDto, UpdateBaseUserDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('createUser')
  async create(@Payload() data: CreateBaseUserDto) {
    return await this.appService.create(data);
  }

  @MessagePattern('findAllUsers')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    return await this.appService.findAll(payload.page, payload.pageSize);
  }

  @MessagePattern('findOneUser')
  async findOne(@Payload() id: string) {
    return await this.appService.findOne(id);
  }

  @MessagePattern('findOneUserByEmail')
  async findOneByEmail(@Payload() email: string) {
    console.log('findOneByEmail', email);
    return await this.appService.findOneByEmail(email);
  }

  @MessagePattern('updateUser')
  async update(@Payload() payload: { id: string; data: UpdateBaseUserDto }) {
    return await this.appService.update(payload.id, payload.data);
  }

  @MessagePattern('deleteUser')
  async delete(@Payload() id: string) {
    return await this.appService.delete(id);
  }
}
