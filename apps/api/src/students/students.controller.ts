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
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@obg/decorators';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateStudentUserInputDto,
  createStudentUserInputSchema,
  UpdateStudentUserInputDto,
  updateStudentUserInputSchema,
} from '@obg/schemas';
import { ZodValidationPipe } from '@obg/pipes';
import { lastValueFrom } from 'rxjs';
import { UserRole } from '@obg/enums';

@ApiTags('Estudantes')
@IsPublic()
@Controller('students')
export class StudentsController {
  constructor(@Inject('API_GATEWAY_CONSUMER') private client: ClientProxy) {}

  @Post()
  @ApiOperation({
    summary: 'Criar Estudante',
    description: 'Cria um estudante',
  })
  @UsePipes(new ZodValidationPipe(createStudentUserInputSchema))
  async create(@Body() createStudentUserInputDto: CreateStudentUserInputDto) {
    try {
      const payload = {
        ...createStudentUserInputDto,
        role: UserRole.STUDENT,
      };
      return await lastValueFrom(this.client.send('createUser', payload));
    } catch (error) {
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

  @Get()
  @ApiOperation({
    summary: 'Listar Estudantes',
    description: 'Lista todos os estudantes por página e tamanho da página',
  })
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const payload = { page, pageSize };
      return await lastValueFrom(this.client.send('findAllStudents', payload));
    } catch (error) {
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

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar Estudante',
    description: 'Busca um estudante pelo ID',
  })
  async findOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('findOneStudent', id));
    } catch (error) {
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

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar Estudante',
    description: 'Atualiza um estudante pelo ID',
  })
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateStudentUserInputSchema))
    updateStudentUserInputDto: UpdateStudentUserInputDto,
  ) {
    try {
      const payload = {
        ...updateStudentUserInputDto,
        role: UserRole.STUDENT,
        id,
      };
      return await lastValueFrom(this.client.send('updateUser', payload));
    } catch (error) {
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

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover Estudante',
    description: 'Remove um estudante pelo ID',
  })
  async remove(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('removeUser', id));
    } catch (error) {
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
