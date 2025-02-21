import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from '@repo/common/index';
import { SchoolsService } from './schools/schools.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    private readonly schoolsService: SchoolsService,
  ) {}
  async create(createSchoolDto: CreateSchoolDto) {
    try {
      return await this.schoolsService.create(createSchoolDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
