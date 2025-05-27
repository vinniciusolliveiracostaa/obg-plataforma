import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload, RpcException } from '@nestjs/microservices';
import { TeacherUserDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('createdUser')
  async create(@Payload() teacherUserDto: TeacherUserDto) {
    try {
      console.log(teacherUserDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('findAllTeachers')
  async findAll() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('findOneTeacher')
  async findOne() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('updatedUser')
  async update() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('removedUser')
  async remove() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}