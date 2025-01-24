import { Controller} from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto, User } from '@repo/common/index';
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(@Payload() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(createUserDto);
    return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'update_user_roleId' })
  async updateUserRoleId(@Payload() payload: { userId: string, updateUserDto: UpdateUserDto }) {
    try {
      const { userId, updateUserDto } = payload;
      const user = await this.usersService.updateUserRoleId(userId, updateUserDto);
      return user;
    } catch (error) { 
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(@Payload() id: string) {
    try {
      const user = await this.usersService.deleteUser(id);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    try {
      const users = this.usersService.getUsers();
      return users;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUser(@Payload() id: string) {
    try {
      const user = await this.usersService.getUser(id);
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
