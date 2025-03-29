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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';

import { CreateSchoolDto, UpdateSchoolDto } from '@repo/dtos/index';

@ApiTags('Escolas')
@Controller('schools')
export class SchoolsController {
  constructor(
    @Inject('SCHOOLS_SERVICE_GATEWAY_CONSUMER') private client: ClientNats,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma escola',
    description: 'Cria uma nova escola no sistema',
  })
  async create(@Body() createSchoolDto: CreateSchoolDto) {
    try {
      const school = await lastValueFrom(
        this.client.send('createSchool', createSchoolDto),
      );
      return school;
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Erro Interno do Servidor',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as escolas',
    description: 'Retorna uma lista de todas as escolas cadastradas',
  })
  async findAll() {
    try {
      const schools = await lastValueFrom(
        this.client.send('findAllSchools', {}),
      );
      return schools;
    } catch (error) {
      switch (error.message) {
        case 'SCHOOLS_NOT_FOUND':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Nenhuma Escola encontrada',
              error: error.message,
            },
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Erro Interno do Servidor',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar uma escola por ID',
    description: 'Retorna uma escola cadastrada pelo seu ID',
  })
  async findOne(@Param('id') id: string) {
    try {
      const school = await lastValueFrom(this.client.send('findOneSchool', id));
      return school;
    } catch (error) {
      switch (error.message) {
        case 'SCHOOL_NOT_FOUND':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Escola não encontrada',
              error: error.message,
            },
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Erro Interno do Servidor',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar uma escola',
    description: 'Atualiza uma escola cadastrada pelo seu ID',
  })
  async update(
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    try {
      const payload = { id, updateSchoolDto };
      const school = await lastValueFrom(
        this.client.send('updateSchool', payload),
      );
      return school;
    } catch (error) {
      switch (error.message) {
        case 'SCHOOL_NOT_FOUND':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Nenhuma Escola encontrada',
              error: error.message,
            },
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Erro Interno do Servidor',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover uma escola',
    description: 'Remove uma escola cadastrada pelo seu ID',
  })
  async remove(@Param('id') id: string) {
    try {
      const school = await lastValueFrom(this.client.send('removeSchool', id));
      return school;
    } catch (error) {
      switch (error.message) {
        case 'SCHOOL_NOT_FOUND':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Nenhuma Escola encontrada',
              error: error.message,
            },
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Erro Interno do Servidor',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
