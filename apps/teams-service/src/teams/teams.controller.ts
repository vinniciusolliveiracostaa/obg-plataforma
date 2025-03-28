import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateTeamDto } from '@repo/dtos/index';

@Controller()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @MessagePattern('createTeam')
  create(@Payload() createTeamDto: CreateTeamDto) {
    try {
      const team = this.teamsService.create(createTeamDto);
      return team;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllTeams')
  findAll() {
    try {
      const teams = this.teamsService.findAll();
      return teams;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneTeam')
  findOne(@Payload() id: string) {
    try {
      const team = this.teamsService.findOne(id);
      return team;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateTeam')
  update(@Payload() payload: { id: string; updateTeamDto: UpdateTeamDto }) {
    try {
      const team = this.teamsService.update(payload.id, payload.updateTeamDto);
      return team;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('removeTeam')
  remove(@Payload() id: string) {
    try {
      const team = this.teamsService.remove(id);
      return team;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
