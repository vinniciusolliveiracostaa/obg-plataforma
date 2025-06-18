import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { TeacherUserDto } from '@obg/schemas';
import { UserRole } from '@obg/enums';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user.created')
  async create(@Payload() data: TeacherUserDto) {
    if (data.role !== UserRole.TEACHER) {
      return; // Ignora se o role não for TEACHER
    }
    return await this.appService.create(data);
  }

  @MessagePattern('teacher.findAll')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    return await this.appService.findAll(payload.page, payload.pageSize);
  }

  @MessagePattern('teacher.findOneByEmail')
  async findOneByEmail(@Payload() email: string) {
    return await this.appService.findOneByEmail(email);
  }

  @MessagePattern('teacher.findOne')
  async findOne(@Payload() id: string) {
    return await this.appService.findOne(id);
  }

  @EventPattern('user.updated')
  async update(@Payload() data: TeacherUserDto) {
    if (data.role !== UserRole.TEACHER) {
      return; // Ignora se o role não for TEACHER
    }
    return await this.appService.update(data);
  }

  @EventPattern('user.deleted')
  async remove(@Payload() data: TeacherUserDto) {
    if (data.role !== UserRole.TEACHER) {
      return; // Ignora se o role não for TEACHER
    }
    return await this.appService.remove(data);
  }
}
