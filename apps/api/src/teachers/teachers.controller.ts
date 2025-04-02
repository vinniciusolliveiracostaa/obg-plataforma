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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientNats } from '@nestjs/microservices';

import { CreateTeacherDto, UpdateTeacherDto } from '@repo/dtos/index';
import { lastValueFrom } from 'rxjs';

@ApiTags('Professores')
@Controller('teachers')
export class TeachersController {
  constructor(@Inject('GATEWAY_CONSUMER') private client: ClientNats) {}

  async onModuleInit() {
    this.client.connect();
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um professor',
    description: 'Cria um novo professor no sistema',
  })
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    try {
      return await lastValueFrom(
        this.client.send('createTeacher', createTeacherDto),
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
  @ApiOperation({
    summary: 'Buscar um professor',
    description: 'Busca um professor pelo ID',
  })
  async findOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('findOneTeacher', id));
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
  @ApiOperation({
    summary: 'Buscar todos os professores',
    description: 'Busca todos os professores cadastrados no sistema',
  })
  async findAll() {
    try {
      return await lastValueFrom(this.client.send('findAllTeachers', {}));
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
  @ApiOperation({
    summary: 'Atualizar um professor',
    description: 'Atualiza os dados de um professor pelo ID',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    try {
      const payload = { id, updateTeacherDto };
      return await lastValueFrom(this.client.send('updateTeacher', payload));
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
  @ApiOperation({
    summary: 'Deletar um professor',
    description: 'Deleta um professor pelo ID',
  })
  async remove(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('removeTeacher', id));
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
