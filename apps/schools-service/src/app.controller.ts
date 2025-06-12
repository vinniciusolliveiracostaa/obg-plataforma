import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ChunkMetadata } from '@obg/interfaces';
import { CreateSchoolDto, UpdateSchoolDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('school.create')
  async create(@Payload() data: CreateSchoolDto) {
    return await this.appService.create(data);
  }

  @MessagePattern('school.findAll')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    return await this.appService.findAll(payload.page, payload.pageSize);
  }

  @MessagePattern('school.findMany')
  async findMany(@Payload() schoolsId: string[]) {
    return await this.appService.findMany(schoolsId);
  }

  @MessagePattern('school.findOne')
  async findOne(@Payload() id: string) {
    return await this.appService.findOne(id);
  }

  @MessagePattern('school.update')
  async update(@Payload() payload: { id: string; data: UpdateSchoolDto }) {
    return await this.appService.update(payload.id, payload.data);
  }

  @MessagePattern('school.remove')
  async remove(@Payload() id: string) {
    return await this.appService.remove(id);
  }

  @EventPattern('school.upload')
  async uploadCsv(@Payload() data: { metadata: ChunkMetadata; data: string }) {
    return await this.appService.uploadCsv(data.metadata, data.data);
  }
}
