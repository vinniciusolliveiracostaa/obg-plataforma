import { Controller } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { SchoolsCsvService } from './schools-csv.service';
import { ChunkMetadata } from '@obg/interfaces';
import { CreateSchoolDto, UpdateSchoolDto } from '@obg/schemas';

@Controller()
export class SchoolsController {
  constructor(
    private readonly schoolsService: SchoolsService,
    private readonly schoolsCsvService: SchoolsCsvService,
  ) {}

  @MessagePattern('createOneSchool')
  async createOne(@Payload() createSchoolDto: CreateSchoolDto) {
    try {
      return await this.schoolsService.createOne(createSchoolDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllSchools')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    try {
      return await this.schoolsService.findAll(payload.page, payload.pageSize);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findManySchools')
  async findManu(@Payload() schoolsId: string[]) {
    try {
      return await this.schoolsService.findMany(schoolsId);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneSchool')
  async findOne(@Payload() id: string) {
    try {
      return await this.schoolsService.findOne(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateOneSchool')
  async updateOne(
    @Payload() payload: { id: string; updateSchoolDto: UpdateSchoolDto },
  ) {
    try {
      return await this.schoolsService.updateOne(
        payload.id,
        payload.updateSchoolDto,
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('removeOneSchool')
  async removeOne(@Payload() id: string) {
    try {
      return await this.schoolsService.removeOne(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('uploadSchoolsCsv')
  async upload(data: { metadata: ChunkMetadata; data: string }) {
    try {
      return await this.schoolsCsvService.upload(data);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}