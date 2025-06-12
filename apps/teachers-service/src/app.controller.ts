import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { TeacherUserDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('createdUser')
  async create(@Payload() data: TeacherUserDto) {
    return await this.appService.create(data);
  }

  @MessagePattern('findAllTeachers')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    return await this.appService.findAll(payload.page, payload.pageSize);
  }

  @MessagePattern('findOneTeacher')
  async findOne(@Payload() id: string) {
    return await this.appService.findOne(id);
  }

  @EventPattern('updatedUser')
  async update(@Payload() data: TeacherUserDto) {
    return await this.appService.update(data);
  }

  @EventPattern('deletedUser')
  async remove(@Payload() data: TeacherUserDto) {
    return await this.appService.remove(data);
  }
}
