import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CreateSchoolDto, UpdateSchoolDto } from '@repo/dtos/index';
import { lastValueFrom } from 'rxjs';

@ApiTags('Escolas')
@Controller('schools')
export class SchoolsController {
  constructor(@Inject('GATEWAY_CONSUMER') private client: ClientNats) {}

  @Post()
  async create(@Body() createSchoolDto: CreateSchoolDto) {
    try {
      return await lastValueFrom(
        this.client.send('createSchool', createSchoolDto),
      );
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('findOneSchool', id));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
  @Get()
  async findAll() {
    try {
      return await lastValueFrom(this.client.send('findAllSchools', {}));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    try {
      const payload = { id, updateSchoolDto };
      return await lastValueFrom(this.client.send('updateSchool', payload));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('removeSchool', id));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
