import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TeamsService } from './teams.service';
// noinspection ES6PreferShortImport
import { CreateTeamDto, UpdateTeamDto } from '@repo/dtos/index';

@Controller()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @MessagePattern('createTeam')
  create(@Payload() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @MessagePattern('findAllTeams')
  findAll() {
    return this.teamsService.findAll();
  }

  @MessagePattern('findOneTeam')
  findOne(@Payload() id: string) {
    return this.teamsService.findOne(id);
  }

  @MessagePattern('updateTeam')
  update(@Payload() payload: { id: string; updateTeamDto: UpdateTeamDto }) {
    return this.teamsService.update(payload.id, payload.updateTeamDto);
  }

  @MessagePattern('removeTeam')
  remove(@Payload() id: string) {
    return this.teamsService.remove(id);
  }
}
