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

import { CreateTeacherDto, UpdateTeacherDto } from '@repo/dtos/index';

@ApiTags('Professores')
@Controller('teachers')
export class TeachersController {
  constructor(
    @Inject('TEACHERS_SERVICE_GATEWAY_CONSUMER') private client: ClientNats,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um professor',
    description: 'Cria um novo professor no sistema',
  })
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    try {
      const teacher = await lastValueFrom(
        this.client.send('createTeacher', createTeacherDto),
      );
      return teacher;
    } catch (error) {
      switch (error) {
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
    summary: 'Listar todos os professores',
    description: 'Retorna uma lista de todos os professores cadastrados',
  })
  async findAll() {
    try {
      const teachers = await lastValueFrom(
        this.client.send('findAllTeachers', {}),
      );
      return teachers;
    } catch (error) {
      switch (error) {
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
    summary: 'Listar um professor',
    description: 'Retorna um professor específico pelo ID',
  })
  async findOne(@Param('id') id: string) {
    try {
      const teacher = await lastValueFrom(
        this.client.send('findOneTeacher', id),
      );
      return teacher;
    } catch (error) {
      switch (error) {
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
    summary: 'Atualizar um professor',
    description: 'Atualiza os dados de um professor específico pelo ID',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    try {
      const payload = { id, updateTeacherDto };
      const teacher = await lastValueFrom(
        this.client.send('updateTeacher', payload),
      );
      return teacher;
    } catch (error) {
      switch (error) {
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
    summary: 'Deletar um professor',
    description: 'Remove um professor específico pelo ID',
  })
  async remove(@Param('id') id: string) {
    try {
      const teacher = await lastValueFrom(
        this.client.send('removeTeacher', id),
      );
      return teacher;
    } catch (error) {
      switch (error) {
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
