import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async createStudent() {}

  @Get()
  async findAllStudents() {}

  @Get(':id')
  async findOneStudent() {}

  @Patch()
  async updateStudent() {}

  @Delete(':id')
  async removeStudent() {}
}
