import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  async createTeacher() {}

  @Get()
  async findAllTeachers() {}

  @Get(':id')
  async findOneTeacher() {}

  @Patch()
  async updateTeacher() {}

  @Delete(':id')
  async removeTeacher() {}
}
