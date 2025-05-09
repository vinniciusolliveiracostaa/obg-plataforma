import { Controller } from '@nestjs/common';
import { CreateSchoolDto, UpdateSchoolDto } from '@repo/dtos';
import { SchoolsService } from './schools.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SchoolsCsvService } from './schools-csv.service';
import { ChunkMetadata } from '@repo/interfaces';

@Controller()
export class SchoolsController {
  constructor(
    private readonly schoolsService: SchoolsService,
    private readonly schoolsCsvService: SchoolsCsvService,
  ) {}

  @MessagePattern('createSchool')
  async create(@Payload() createSchoolDto: CreateSchoolDto) {
    return await this.schoolsService.create(createSchoolDto);
  }

  @EventPattern('importSchools')
  async import(@Payload() data: { metadata: ChunkMetadata; data: string }) {
    //console.log(data.fileBuffer);
    return await this.schoolsCsvService.createManySchoolsFromCsv(data);
  }

  @MessagePattern('findAllSchools')
  async findAll() {
    return await this.schoolsService.findAll();
  }

  @MessagePattern('findOneSchool')
  async findOne(@Payload() id: string) {
    return await this.schoolsService.findOne(id);
  }

  @MessagePattern('updateSchool')
  async update(
    @Payload() payload: { id: string; updateSchoolDto: UpdateSchoolDto },
  ) {
    return await this.schoolsService.update(
      payload.id,
      payload.updateSchoolDto,
    );
  }

  @MessagePattern('removeSchool')
  async remove(@Payload() id: string) {
    return await this.schoolsService.remove(id);
  }
}
