import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@repo/dtos/index';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    try {
      const user = this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findAllUsers')
  findAll() {
    try {
      const users = this.usersService.findAll();
      return users;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: string) {
    try {
      const user = this.usersService.findOne(id);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('updateUser')
  update(@Payload() payload: { id: string; updateUserDto: UpdateUserDto }) {
    try {
      const user = this.usersService.update(payload.id, payload.updateUserDto);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: string) {
    try {
      const user = this.usersService.remove(id);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
