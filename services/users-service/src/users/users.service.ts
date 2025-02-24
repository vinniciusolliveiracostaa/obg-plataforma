import { Body, Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
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

  async create(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    try {
      if (!createUserDto.email || !createUserDto.password) {
        throw new RpcException('Missing email or password');
      }

      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new RpcException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = new User({
        ...createUserDto,
        id: createId(),
        password: hashedPassword,
      });

      const createdUser = await this.entityManager.save(user);
      return createdUser;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async delete(id: string) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new RpcException('User not found');
      }
      await this.usersRepository.remove(user);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      if (!user) {
        throw new RpcException('User not found');
      }
      return user;
    } catch (error) {throw new RpcException(error.message);}
  }

  async getUsers() {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
