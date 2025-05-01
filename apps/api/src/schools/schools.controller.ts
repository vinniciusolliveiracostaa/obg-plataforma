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
import { lastValueFrom } from 'rxjs';
import { ClientNats } from '@nestjs/microservices';
// noinspection ES6PreferShortImport
import { CreateSchoolDto, UpdateSchoolDto } from '@repo/dtos/index';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Escolas')
@Controller('schools')
export class SchoolsController {
  constructor(@Inject('GATEWAY_CONSUMER') private client: ClientNats) {}

  @Post()
  @ApiOperation({ summary: 'Criar Escola', description: 'Cria uma escola' })
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
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Obter Escolas',
    description: 'Obter todas as Escolas',
  })
  async findAll() {
    try {
      return await lastValueFrom(this.client.send('findAllSchools', {}));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter Escola',
    description: 'Obter uma escola pelo ID',
  })
  async findOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('findOneSchool', id));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar Escola',
    description: 'Atualiza uma escola pelo ID',
  })
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
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover Escola',
    description: 'Remove uma escola pelo ID',
  })
  async remove(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('removeSchool', id));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
