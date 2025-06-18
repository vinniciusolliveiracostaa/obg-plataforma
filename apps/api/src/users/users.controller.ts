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
import { UsersService } from './users.service';
import { ZodValidationPipe } from '@obg/pipes';
import {
  CreateBaseUserDto,
  createBaseUserSchema,
  UpdateBaseUserDto,
  updateBaseUserSchema,
} from '@obg/schemas';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@obg/decorators';

@ApiTags('Usuários')
//@RequiredRoles(UserRole.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  @UsePipes(new ZodValidationPipe(createBaseUserSchema))
  @ApiOperation({
    summary: 'Criar Usuário',
    description: 'Cria um usuário',
  })
  async create(@Body() data: CreateBaseUserDto) {
    return await this.usersService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar Usuários',
    description: 'Lista os usuários por página e tamanho da página',
  })
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.usersService.findAll(page, pageSize);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter Usuário',
    description: 'Obtém um usuário pelo ID',
  })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar Usuário',
    description: 'Atualiza um usuário pelo ID',
  })
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateBaseUserSchema))
    data: UpdateBaseUserDto,
  ) {
    return await this.usersService.update(id, data);
  }

  @IsPublic()
  @Delete(':id')
  @ApiOperation({
    summary: 'Remover Usuário',
    description: 'Remove um usuário pelo ID',
  })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
