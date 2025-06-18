import { Body, Controller, Param, Query, UsePipes } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { ApiOperation } from '@nestjs/swagger';
import { ZodValidationPipe } from '@obg/pipes';
import {
  CreateTeamDto,
  createTeamSchema,
  UpdateTeamDto,
  updateTeamSchema,
} from '@obg/schemas';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @UsePipes(new ZodValidationPipe(createTeamSchema))
  @ApiOperation({
    summary: 'Criar Equipe',
    description: 'Cria uma nova equipe',
  })
  async create(@Body() data: CreateTeamDto) {
    return await this.teamsService.create(data);
  }

  @ApiOperation({
    summary: 'Listar Equipes',
    description: 'Lista todas as equipes por página e tamanho da página',
  })
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.teamsService.findAll(page, pageSize);
  }

  @ApiOperation({
    summary: 'Buscar Equipe',
    description: 'Busca uma equipe pelo ID',
  })
  async findOne(@Param('id') id: string) {
    return await this.teamsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualizar Equipe',
    description: 'Atualiza uma equipe pelo ID',
  })
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateTeamSchema))
    data: UpdateTeamDto,
  ) {
    return await this.teamsService.update(id, data);
  }

  @ApiOperation({
    summary: 'Remover Equipe',
    description: 'Remove uma equipe pelo ID',
  })
  async remove(@Param('id') id: string) {
    return await this.teamsService.remove(id);
  }
}
