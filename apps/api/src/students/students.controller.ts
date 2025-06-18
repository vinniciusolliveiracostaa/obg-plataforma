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
import { StudentsService } from './students.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '@obg/pipes';
import {
  CreateStudentUserInputDto,
  createStudentUserInputSchema,
  UpdateStudentUserInputDto,
  updateStudentUserInputSchema,
} from '@obg/schemas';

@ApiTags('Estudantes')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createStudentUserInputSchema))
  @ApiOperation({
    summary: 'Criar Estudante',
    description: 'Cria um estudante',
  })
  async create(@Body() data: CreateStudentUserInputDto) {
    return await this.studentsService.create(data);
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
    return await this.studentsService.findAll(page, pageSize);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar Estudante',
    description: 'Busca um estudante pelo ID',
  })
  async findOne(@Param('id') id: string) {
    return await this.studentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar Estudante',
    description: 'Atualiza um estudante pelo ID',
  })
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateStudentUserInputSchema))
    data: UpdateStudentUserInputDto,
  ) {
    return await this.studentsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover Estudante',
    description: 'Remove um estudante pelo ID',
  })
  async remove(@Param('id') id: string) {
    return await this.studentsService.remove(id);
  }
}
