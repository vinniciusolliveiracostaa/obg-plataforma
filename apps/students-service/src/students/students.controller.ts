import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from '@repo/dtos/index';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern('createStudent')
  async create(@Payload() createStudentDto: CreateStudentDto) {
    try {
      return this.studentsService.create(createStudentDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllStudents')
  async findAll() {
    try {
      return this.studentsService.findAll();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneStudent')
  async findOne(@Payload() id: string) {
    try {
      return this.studentsService.findOne(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateStudent')
  async update(
    @Payload() payload: { id: string; updateStudentDto: UpdateStudentDto },
  ) {
    try {
      return this.studentsService.update(payload.id, payload.updateStudentDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('removeStudent')
  async remove(@Payload() id: string) {
    try {
      return this.studentsService.remove(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
