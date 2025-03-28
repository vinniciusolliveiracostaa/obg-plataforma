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
      const teacher = this.schoolsService.create(createSchoolDto);
      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllSchools')
  findAll() {
    try {
      const teachers = this.schoolsService.findAll();
      return teachers;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneSchool')
  findOne(@Payload() id: string) {
    try {
      const teacher = this.schoolsService.findOne(id);
      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateSchool')
  update(@Payload() payload: { id: string; updateSchoolDto: UpdateSchoolDto }) {
    try {
      const teacher = this.schoolsService.update(
        payload.id,
        payload.updateSchoolDto,
      );
      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('removeSchool')
  remove(@Payload() id: string) {
    try {
      const teacher = this.schoolsService.remove(id);
      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
