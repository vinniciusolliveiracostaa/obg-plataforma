import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto, UpdateSchoolDto } from '@repo/dtos/index';

@Controller()
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @MessagePattern('createSchool')
  create(@Payload() createSchoolDto: CreateSchoolDto) {
    try {
      return this.schoolsService.create(createSchoolDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllSchools')
  findAll() {
    try {
      return this.schoolsService.findAll();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneSchool')
  findOne(@Payload() id: string) {
    try {
      return this.schoolsService.findOne(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateSchool')
  update(@Payload() payload: { id: string; updateSchoolDto: UpdateSchoolDto }) {
    try {
      return this.schoolsService.update(payload.id, payload.updateSchoolDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('removeSchool')
  remove(@Payload() id: string) {
    try {
      return this.schoolsService.remove(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
