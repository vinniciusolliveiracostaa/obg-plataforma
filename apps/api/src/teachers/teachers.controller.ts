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
import { IsPublic } from '@obg/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateTeacherUserInputDto,
  createTeacherUserInputSchema,
  UpdateTeacherUserInputDto,
  updateTeacherUserInputSchema,
} from '@obg/schemas';
import { ZodValidationPipe } from '@obg/pipes';
import { UserRole } from '@obg/enums';
import { lastValueFrom } from 'rxjs';

@ApiTags('Professores')
@IsPublic()
@Controller('teachers')
export class TeachersController {
  constructor(@Inject('API_GATEWAY_CONSUMER') private client: ClientProxy) {}

  @Post()
  @ApiOperation({
    summary: 'Criar Professor',
    description: 'Cria um professor',
  })
  @UsePipes(new ZodValidationPipe(createTeacherUserInputSchema))
  async create(@Body() createTeacherUserInputDto: CreateTeacherUserInputDto) {
    try {
      const payload = {
        ...createTeacherUserInputDto,
        role: UserRole.TEACHER,
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
    summary: 'Listar Professores',
    description: 'Lista todos os professores por página e tamanho da página',
  })
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const payload = { page, pageSize };
      return await lastValueFrom(this.client.send('findAllUsers', payload));
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
    summary: 'Buscar Professor',
    description: 'Busca um professor pelo ID',
  })
  async findOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('findOneTeacher', id));
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
    summary: 'Atualizar Professor',
    description: 'Atualiza um professor pelo ID',
  })
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateTeacherUserInputSchema))
    updateTeacherUserInputDto: UpdateTeacherUserInputDto,
  ) {
    try {
      const payload = {
        ...updateTeacherUserInputDto,
        role: UserRole.TEACHER,
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
    summary: 'Remover Professor',
    description: 'Remove um professor pelo ID',
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
