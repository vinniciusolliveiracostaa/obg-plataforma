import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { createId } from '@paralleldrive/cuid2';
import { RpcException } from '@nestjs/microservices';

import { User } from '@repo/entities/index';
import { CreateUserDto, UpdateUserDto } from '@repo/dtos/index';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  // Criar um usuário

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User({
        ...createUserDto,
        id: createId(),
      });

      const createdUser = await this.entityManager.save(user);

      return createdUser;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Listar todos os usuários

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();

      if (users.length === 0) {
        throw new RpcException('STUDENTS_NOT_FOUND');
      }

      return users;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Listar um usuário pelo ID

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Atualizar um usuário

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      await this.entityManager.update(User, id, updateUserDto);

      const updatedUser = await this.userRepository.findOneBy({ id });

      if (!updatedUser) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      return updatedUser;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Deletar um usuário

  async remove(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      await this.entityManager.delete(User, id);

      return;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
