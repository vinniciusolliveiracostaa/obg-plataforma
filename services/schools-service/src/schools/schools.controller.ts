import { Controller } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateSchoolDto } from '@repo/common/index';

@Controller()
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @MessagePattern({ cmd: 'create_school' })
  async createSchool(@Payload() createSchoolDto: CreateSchoolDto) {
    try {
      const school = await this.schoolsService.createSchool(createSchoolDto);
      return school;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'get_school' })
  async getSchool(@Payload() id: string) {
    try {
      const school = await this.schoolsService.getSchool(id);
      return school;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
