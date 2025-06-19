import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { SchoolsService } from './schools.service';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  async createSchool() {}

  @Get()
  async findAllSchools() {}

  @Get(':id')
  async findOneSchool() {}

  @Patch()
  async updateSchool() {}

  @Delete(':id')
  async removeSchool() {}
}
