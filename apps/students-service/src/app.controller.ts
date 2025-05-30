import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { StudentUserDto, UpdateStudentUserDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('createdUser')
  async create(@Payload() studentUserDto: StudentUserDto) {
    try {
      return await this.appService.create(studentUserDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllStudents')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    try {
      return await this.appService.findAll(payload.page, payload.pageSize);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneStudent')
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
      updateStudentUserDto: UpdateStudentUserDto;
    },
  ) {
    try {
      return await this.appService.update(
        payload.id,
        payload.updateStudentUserDto,
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