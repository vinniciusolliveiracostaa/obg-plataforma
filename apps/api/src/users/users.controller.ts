import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me() {}

  @Patch('me')
  async meUpdate() {}

  @Get(':id')
  async findOne() {}

  @Patch(':id')
  async update() {}

  @Delete(':id')
  async remove() {}
}
