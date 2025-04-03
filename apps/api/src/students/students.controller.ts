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
import { CreateStudentDto, UpdateStudentDto } from '@repo/dtos/index';
import { lastValueFrom } from 'rxjs';

@Controller('students')
export class StudentsController {
  constructor(@Inject('GATEWAY_CONSUMER') private client: ClientNats) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    try {
      return await lastValueFrom(
        this.client.send('createStudent', createStudentDto),
      );
    } catch (error) {
      switch (error.message) {
        case 'STUDENT_ALREADY_EXISTS':
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              message: 'Aluno já existe',
              error: error.message,
            },
            HttpStatus.CONFLICT,
          );
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
      return await lastValueFrom(this.client.send('findOneStudent', id));
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
      return await lastValueFrom(this.client.send('findAllStudents', {}));
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
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const payload = { id, updateStudentDto };
      return await lastValueFrom(this.client.send('updateStudent', payload));
    } catch (error) {
      switch (error.message) {
        case 'STUDENT_ALREADY_EXISTS':
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              message: 'Aluno já existe',
              error: error.message,
            },
            HttpStatus.CONFLICT,
          );
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
      return await lastValueFrom(this.client.send('removeStudent', id));
    } catch (error) {
      switch (error.message) {
        case 'STUDENT_ALREADY_EXISTS':
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              message: 'Aluno já existe',
              error: error.message,
            },
            HttpStatus.CONFLICT,
          );
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
