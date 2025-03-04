import { Controller } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateSchoolDto } from '@repo/dtos/index';

@Controller()
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @MessagePattern({ cmd: 'create.school' })
  async create(@Payload() createSchoolDto: CreateSchoolDto) {
    try {
      const school = await this.schoolsService.create(createSchoolDto);
      return school;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
