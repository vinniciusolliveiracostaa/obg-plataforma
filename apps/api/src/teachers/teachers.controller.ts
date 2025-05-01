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
import { CreateTeacherDto, UpdateTeacherDto } from '@repo/dtos/index';
import { lastValueFrom } from 'rxjs';

@ApiTags('Professores')
@Controller('teachers')
export class TeachersController {
  constructor(@Inject('GATEWAY_CONSUMER') private client: ClientNats) {}

  @Post()
  @ApiOperation({
    summary: 'Criar Professor',
    description: 'Cria um Professor',
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
    summary: 'Listar Professores',
    description: 'Lista todos os Professores',
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
    summary: 'Buscar Professor',
    description: 'Busca um Professor pelo ID',
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
    summary: 'Atualizar Professor',
    description: 'Atualiza um Professor pelo ID',
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
    summary: 'Deletar Professor',
    description: 'Deleta um Professor pelo ID',
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
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
