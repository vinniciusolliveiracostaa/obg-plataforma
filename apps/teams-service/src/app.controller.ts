import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateTeamDto, UpdateTeamDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('createTeam')
  async create(@Payload() createTeamDto: CreateTeamDto) {
    try {
      return await this.appService.create(createTeamDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllTeams')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    try {
      return await this.appService.findAll(payload.page, payload.pageSize);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneTeam')
  async findOne(@Payload() id: string) {
    try {
      return await this.appService.findOne(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateTeam')
  async update(
    @Payload() payload: { id: string; updateTeamDto: UpdateTeamDto },
  ) {
    try {
      return await this.appService.update(payload.id, payload.updateTeamDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('removeTeam')
  async remove(@Payload() id: string) {
    try {
      return await this.appService.remove(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
