import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  async createTeam() {}

  @Get()
  async findAllTeams() {}

  @Get(':id')
  async findOneTeam() {}

  @Patch()
  async updateTeam() {}

  @Delete(':id')
  async removeTeam() {}

  @Post(':id/add-student')
  async addStudent() {}

  @Delete(':id/remove-student')
  async removeStudent() {}

  @Post(':id/replace-teacher')
  async replaceTeacher() {}
}
