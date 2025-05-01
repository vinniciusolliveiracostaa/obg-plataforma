// noinspection ES6PreferShortImport

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto, UpdateSchoolDto } from '@repo/dtos/index';

@Controller()
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @MessagePattern('createSchool')
  create(@Payload() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }

  @MessagePattern('findAllSchools')
  findAll() {
    return this.schoolsService.findAll();
  }

  @MessagePattern('findOneSchool')
  findOne(@Payload() id: string) {
    return this.schoolsService.findOne(id);
  }

  @MessagePattern('updateSchool')
  update(@Payload() payload: { id: string; updateSchoolDto: UpdateSchoolDto }) {
    return this.schoolsService.update(payload.id, payload.updateSchoolDto);
  }

  @MessagePattern('removeSchool')
  remove(@Payload() id: string) {
    return this.schoolsService.remove(id);
  }
}
