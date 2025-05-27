import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateBaseUserDto, UpdateBaseUserDto } from '@obg/schemas';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('createUser')
  async create(@Payload() createBaseUserDto: CreateBaseUserDto) {
    try {
      return await this.appService.create(createBaseUserDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllUsers')
  async findAll(@Payload() payload: { page: number; pageSize: number }) {
    try {
      return await this.appService.findAll(payload.page, payload.pageSize);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneUser')
  async findOne(id: string) {
    try {
      return await this.appService.findOne(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneUserByEmail')
  async findOneByEmail(@Payload() email: string) {
    try {
      return await this.appService.findOneByEmail(email);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateUser')
  async update(
    @Payload() payload: { id: string; updateBaseUserDto: UpdateBaseUserDto },
  ) {
    try {
      return await this.appService.update(
        payload.id,
        payload.updateBaseUserDto,
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('deleteUser')
  async delete(id: string) {
    try {
      return await this.appService.delete(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}