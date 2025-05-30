import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { TeacherUserDto, UpdateTeacherUserDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('createdUser')
  async create(@Payload() teacherUserDto: TeacherUserDto) {
    try {
      return await this.appService.create(teacherUserDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllTeachers')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    try {
      return await this.appService.findAll(payload.page, payload.pageSize);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneTeacher')
  async findOne(@Payload() id: string) {
    try {
      return await this.appService.findOne(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('updatedUser')
  async update(
    @Payload()
    payload: {
      id: string;
      updateTeacherUserDto: UpdateTeacherUserDto;
    },
  ) {
    try {
      return await this.appService.update(
        payload.id,
        payload.updateTeacherUserDto,
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('removedUser')
  async remove(@Payload() id: string) {
    try {
      return await this.appService.remove(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}