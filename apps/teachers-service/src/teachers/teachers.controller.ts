import { Controller } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateTeacherDto, UpdateTeacherDto } from '@repo/dtos/index';

@Controller()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}
  @MessagePattern('createTeacher')
  create(@Payload() createTeacherDto: CreateTeacherDto) {
    try {
      return this.teachersService.create(createTeacherDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllTeachers')
  findAll() {
    try {
      return this.teachersService.findAll();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneTeacher')
  findOne(@Payload() id: string) {
    try {
      return this.teachersService.findOne(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateTeacher')
  update(
    @Payload() payload: { id: string; updateTeacherDto: UpdateTeacherDto },
  ) {
    try {
      return this.teachersService.update(payload.id, payload.updateTeacherDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('removeTeacher')
  remove(@Payload() id: string) {
    try {
      return this.teachersService.remove(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllTeachersBySchool')
  async findAllTeachersBySchool(@Payload() schoolId: string) {
    try {
      return this.teachersService.findAllTeachersBySchool(schoolId);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
