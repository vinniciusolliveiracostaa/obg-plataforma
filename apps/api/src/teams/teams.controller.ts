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
// noinspection ES6PreferShortImport
import { CreateTeamDto, UpdateTeamDto } from '@repo/dtos/index';
import { lastValueFrom } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Equipes')
@Controller('teams')
export class TeamsController {
  constructor(@Inject('GATEWAY_CONSUMER') private client: ClientNats) {}

  @Post()
  @ApiOperation({ summary: 'Criar Equipe', description: 'Cria uma Equipe' })
  async create(@Body() createTeamDto: CreateTeamDto) {
    try {
      return await lastValueFrom(this.client.send('createTeam', createTeamDto));
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
    summary: 'Listar Equipes',
    description: 'Lista todas as Equipes',
  })
  async findAll() {
    try {
      return await lastValueFrom(this.client.send('findAllTeams', {}));
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
    summary: 'Buscar Equipe',
    description: 'Busca uma Equipe pelo ID',
  })
  async findOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('findOneTeam', id));
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
    summary: 'Atualizar Equipe',
    description: 'Atualiza uma Equipe pelo ID',
  })
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    try {
      const payload = { id, updateTeamDto };
      return await lastValueFrom(this.client.send('updateTeam', payload));
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
    summary: 'Deletar Equipe',
    description: 'Deleta uma Equipe pelo ID',
  })
  async remove(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('removeTeam', id));
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
