import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ChunkMetadata } from '@obg/interfaces';
import { CreateSchoolDto, UpdateSchoolDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('createSchool')
  async create(@Payload() data: CreateSchoolDto) {
    return await this.appService.create(data);
  }

  @MessagePattern('findAllSchools')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    return await this.appService.findAll(payload.page, payload.pageSize);
  }

  @MessagePattern('findManySchools')
  async findMany(@Payload() schoolsId: string[]) {
    return await this.appService.findMany(schoolsId);
  }

  @MessagePattern('findOneSchool')
  async findOne(@Payload() id: string) {
    return await this.appService.findOne(id);
  }

  @MessagePattern('updateSchool')
  async update(@Payload() payload: { id: string; data: UpdateSchoolDto }) {
    return await this.appService.update(payload.id, payload.data);
  }

  @MessagePattern('removeSchool')
  async remove(@Payload() id: string) {
    return await this.appService.remove(id);
  }

  @EventPattern('uploadSchoolsCsv')
  async uploadCsv(@Payload() data: { metadata: ChunkMetadata; data: string }) {
    return await this.appService.uploadCsv(data.metadata, data.data);
  }
}
