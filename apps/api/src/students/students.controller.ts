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

import { CreateStudentDto, UpdateStudentDto } from '@repo/dtos/index';

@ApiTags('Estudantes')
@Controller('students')
export class StudentsController {
  constructor(
    @Inject('STUDENTS_SERVICE_GATEWAY_CONSUMER') private client: ClientNats,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um estudante',
    description: 'Cria um novo estudante no sistema',
  })
  async create(@Body() createStudentDto: CreateStudentDto) {
    try {
      const student = await lastValueFrom(
        this.client.send('createStudent', createStudentDto),
      );
      return student;
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
    summary: 'Listar todos os estudantes',
    description: 'Retorna uma lista de todos os estudantes cadastrados',
  })
  async findAll() {
    try {
      const students = await lastValueFrom(
        this.client.send('findAllStudents', {}),
      );
      return students;
    } catch (error) {
      switch (error.message) {
        case 'STUDENTS_NOT_FOUND':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Nenhum Estudante encontrado',
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
    summary: 'Buscar um estudante',
    description: 'Retorna um estudante cadastrado',
  })
  async findOne(@Param('id') id: string) {
    try {
      const student = await lastValueFrom(
        this.client.send('findOneStudent', id),
      );
      return student;
    } catch (error) {
      switch (error.message) {
        case 'STUDENT_NOT_FOUND':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Estudante não encontrado',
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
    summary: 'Atualizar um estudante',
    description: 'Atualiza um estudante cadastrado',
  })
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const payload = { id, updateStudentDto };
      const student = await lastValueFrom(
        this.client.send('updateStudent', payload),
      );
      return student;
    } catch (error) {
      switch (error.message) {
        case 'STUDENT_NOT_FOUND':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Estudante não encontrado',
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
    summary: 'Deletar um estudante',
    description: 'Deleta um estudante cadastrado',
  })
  async remove(@Param('id') id: string) {
    try {
      const student = await lastValueFrom(
        this.client.send('removeStudent', id),
      );
      return student;
    } catch (error) {
      switch (error.message) {
        case 'STUDENT_NOT_FOUND':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Estudante não encontrado',
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
