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
import { TeachersService } from './teachers.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateTeacherUserInputDto,
  createTeacherUserInputSchema,
  UpdateTeacherUserInputDto,
  updateTeacherUserInputSchema,
} from '@obg/schemas';
import { ZodValidationPipe } from '@obg/pipes';

@ApiTags('Professores')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createTeacherUserInputSchema))
  @ApiOperation({
    summary: 'Criar Professor',
    description: 'Cria um professor',
  })
  async create(@Body() data: CreateTeacherUserInputDto) {
    return await this.teachersService.create(data);
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
    return await this.teachersService.findAll(page, pageSize);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar Professor',
    description: 'Busca um professor pelo ID',
  })
  async findOne(@Param('id') id: string) {
    return await this.teachersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar Professor',
    description: 'Atualiza um professor pelo ID',
  })
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateTeacherUserInputSchema))
    data: UpdateTeacherUserInputDto,
  ) {
    return await this.teachersService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover Professor',
    description: 'Remove um professor pelo ID',
  })
  async remove(@Param('id') id: string) {
    return await this.teachersService.remove(id);
  }
}
