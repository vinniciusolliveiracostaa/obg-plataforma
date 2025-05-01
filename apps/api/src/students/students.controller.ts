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
// noinspection ES6PreferShortImport
import { CreateStudentDto, UpdateStudentDto } from '@repo/dtos/index';
import { lastValueFrom } from 'rxjs';

@ApiTags('Alunos')
@Controller('students')
export class StudentsController {
  constructor(@Inject('GATEWAY_CONSUMER') private client: ClientNats) {}

  @Post()
  @ApiOperation({ summary: 'Criar Aluno', description: 'Cria um aluno' })
  async create(@Body() createStudentDto: CreateStudentDto) {
    try {
      return await lastValueFrom(
        this.client.send('createStudent', createStudentDto),
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
    summary: 'Obter Alunos',
    description: 'Obter todos os Alunos',
  })
  async findAll() {
    try {
      return await lastValueFrom(this.client.send('findAllStudents', {}));
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
    summary: 'Obter Aluno',
    description: 'Obter um Aluno pelo ID',
  })
  async findOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('findOneStudent', id));
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
    summary: 'Atualizar Aluno',
    description: 'Atualiza um aluno pelo ID',
  })
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const payload = { id, updateStudentDto };
      return await lastValueFrom(this.client.send('updateStudent', payload));
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
    summary: 'Deletar Aluno',
    description: 'Deleta um aluno pelo ID',
  })
  async remove(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('removeStudent', id));
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
