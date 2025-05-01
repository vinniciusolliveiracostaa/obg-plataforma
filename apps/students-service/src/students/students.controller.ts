import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentsService } from './students.service';
// noinspection ES6PreferShortImport
import { CreateStudentDto, UpdateStudentDto } from '@repo/dtos/index';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern('createStudent')
  create(@Payload() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @MessagePattern('findAllStudents')
  findAll() {
    return this.studentsService.findAll();
  }

  @MessagePattern('findManyStudents')
  findMany(@Payload() ids: string[]) {
    return this.studentsService.findMany(ids);
  }

  @MessagePattern('findOneStudent')
  findOne(@Payload() id: string) {
    return this.studentsService.findOne(id);
  }

  @MessagePattern('updateStudent')
  update(
    @Payload() payload: { id: string; updatedStudentDto: UpdateStudentDto },
  ) {
    return this.studentsService.update(payload.id, payload.updatedStudentDto);
  }

  @MessagePattern('removeStudent')
  remove(@Payload() id: string) {
    return this.studentsService.remove(id);
  }
}
