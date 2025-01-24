import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto, User } from '@repo/common/index';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new Error('Usuário já cadastrado');
    }

    const user = new User({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });

    const createdUser = await this.entityManager.save(user);

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async updateUserRoleId(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new RpcException('Usuário não encontrado');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.usersRepository.update(userId, updateUserDto);
    const updatedUser = await this.usersRepository.findOneBy({ id: userId });

    return {
      ...updatedUser,
      password: undefined,
    };
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async getUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users.map((users) => {
      return {
        ...users,
        password: undefined,
      };
    });
  }

  async getUser(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new RpcException('Usuário não encontrado');
      }

      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
