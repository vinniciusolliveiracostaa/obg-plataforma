import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { StudentUserDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user.created')
  async create(@Payload() data: StudentUserDto) {
    return await this.appService.create(data);
  }

  @MessagePattern('student.findAll')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    return await this.appService.findAll(payload.page, payload.pageSize);
  }

  @MessagePattern('student.findOne')
  async findOne(@Payload() id: string) {
    return await this.appService.findOne(id);
  }

  @EventPattern('user.updated')
  async update(@Payload() data: StudentUserDto) {
    return await this.appService.update(data);
  }

  @EventPattern('user.deleted')
  async remove(@Payload() data: StudentUserDto) {
    return await this.appService.remove(data);
  }
}
