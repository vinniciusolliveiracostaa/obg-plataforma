import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto, UpdateTeacherDto } from '@repo/dtos/index';

@Controller()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @MessagePattern('createTeacher')
  create(@Payload() createTeacherDto: CreateTeacherDto) {
    try {
      const teacher = this.teachersService.create(createTeacherDto);
      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllTeachers')
  findAll() {
    try {
      const teachers = this.teachersService.findAll();
      return teachers;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneTeacher')
  findOne(@Payload() id: string) {
    try {
      const teacher = this.teachersService.findOne(id);
      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateTeacher')
  update(
    @Payload() payload: { id: string; updateTeacherDto: UpdateTeacherDto },
  ) {
    try {
      const teacher = this.teachersService.update(
        payload.id,
        payload.updateTeacherDto,
      );
      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('removeTeacher')
  remove(@Payload() id: string) {
    try {
      const teacher = this.teachersService.remove(id);
      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
