import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from '@repo/dtos/index';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern('createStudent')
  create(@Payload() createStudentDto: CreateStudentDto) {
    try {
      const student = this.studentsService.create(createStudentDto);
      return student;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllStudents')
  findAll() {
    try {
      const students = this.studentsService.findAll();
      return students;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneStudent')
  findOne(@Payload() id: string) {
    try {
      const student = this.studentsService.findOne(id);
      return student;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateStudent')
  update(
    @Payload() payload: { id: string; updateStudentDto: UpdateStudentDto },
  ) {
    try {
      const student = this.studentsService.update(
        payload.id,
        payload.updateStudentDto,
      );
      return student;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('removeStudent')
  remove(@Payload() id: string) {
    try {
      const student = this.studentsService.remove(id);
      return student;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
