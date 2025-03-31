import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from '@repo/dtos/index';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllUsers')
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateUser')
  update(@Payload() payload: { id: string; updateUserDto: UpdateUserDto }) {
    try {
      return this.usersService.update(payload.id, payload.updateUserDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: string) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
