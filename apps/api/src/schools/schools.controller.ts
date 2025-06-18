import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import {
  CreateSchoolDto,
  createSchoolSchema,
  UpdateSchoolDto,
  updateSchoolSchema,
} from '@obg/schemas';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '@obg/pipes';

@ApiTags('Escolas')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createSchoolSchema))
  @ApiOperation({ summary: 'Criar Escola', description: 'Cria uma escola' })
  async create(@Body() data: CreateSchoolDto) {
    return await this.schoolsService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Obter Escolas',
    description: 'Obter todas as Escolas por página e tamanho da página',
  })
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.schoolsService.findAll(page, pageSize);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter Escola',
    description: 'Obter uma escola pelo ID',
  })
  async findOne(@Param('id') id: string) {
    return await this.schoolsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar Escola',
    description: 'Atualiza uma escola pelo ID',
  })
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateSchoolSchema))
    data: UpdateSchoolDto,
  ) {
    return await this.schoolsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover Escola',
    description: 'Remove uma escola pelo ID',
  })
  async remove(@Param('id') id: string) {
    return await this.schoolsService.remove(id);
  }
}
