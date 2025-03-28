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

import { CreateTeamDto, UpdateTeamDto } from '@repo/dtos/index';

@ApiTags('Equipes')
@Controller('teams')
export class TeamsController {
  constructor(
    @Inject('TEAMS_SERVICE_GATEWAY_CONSUMER') private client: ClientNats,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma equipe',
    description: 'Cria uma nova equipe no sistema',
  })
  async create(@Body() createTeamDto: CreateTeamDto) {
    try {
      const team = await lastValueFrom(
        this.client.send('createTeam', createTeamDto),
      );
      return team;
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
    summary: 'Listar todas as equipes',
    description: 'Retorna uma lista de todas as equipes cadastradas',
  })
  async findAll() {
    try {
      const teams = await lastValueFrom(this.client.send('findAllTeams', {}));
      return teams;
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
    summary: 'Buscar uma equipe por ID',
    description: 'Retorna uma equipe cadastrada pelo ID',
  })
  async findOne(@Param('id') id: string) {
    try {
      const team = await lastValueFrom(this.client.send('findOneTeam', id));
      return team;
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
    summary: 'Atualizar uma equipe',
    description: 'Atualiza os dados de uma equipe cadastrada',
  })
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    try {
      const payload = { id, updateTeamDto };
      const team = await lastValueFrom(this.client.send('updateTeam', payload));
      return team;
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
    summary: 'Remover uma equipe',
    description: 'Remove uma equipe cadastrada pelo ID',
  })
  async remove(@Param('id') id: string) {
    try {
      const team = await lastValueFrom(this.client.send('removeTeam', id));
      return team;
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
