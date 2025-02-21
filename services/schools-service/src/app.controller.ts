import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CreateSchoolDto } from '@repo/common/index';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create.school' })
  async create(@Payload() createSchoolDto: CreateSchoolDto) {
    try {
      const school = await this.appService.create(createSchoolDto);
      return school;
    } catch (error) {
      if (error.message === 'INEP already exists') {
        throw new RpcException('INEP already exists');
      }
      throw new RpcException(error.message);
    }
  }
}
