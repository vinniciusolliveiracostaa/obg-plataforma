import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@repo/dtos';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('createUser')
  async create(@Payload() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllUsers')
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneUser')
  async findOne(@Payload() id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateUser')
  async update(
    @Payload() payload: { id: string; updateUserDto: UpdateUserDto },
  ) {
    try {
      return await this.usersService.update(payload.id, payload.updateUserDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('removeUser')
  async remove(@Payload() id: string) {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
