import { Inject, Injectable } from '@nestjs/common';
import { ClientNats, RpcException } from '@nestjs/microservices';
import { DeleteResult, EntityManager } from 'typeorm';
import { createId } from '@paralleldrive/cuid2';
import { lastValueFrom } from 'rxjs';

import { CreateUserDto, UpdateUserDto } from '@repo/dtos/index';
import { Student, User } from '@repo/entities/index';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_SERVICE_CONSUMER') private readonly client: ClientNats,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.entityManager.transaction(
        async (transactionalEntityManager) => {
          const existingUser = await this.findUserCreate(
            createUserDto.email,
            createUserDto.cpf,
            createUserDto.phone,
          );
          if (existingUser) {
            throw new RpcException('USER_ALREADY_EXISTS');
          }

          const user = new User({
            ...createUserDto,
            id: createId(),
          });

          const newUser = await transactionalEntityManager.save(User, user);

          if (!newUser) {
            throw new RpcException('USER_NOT_CREATED');
          }

          return newUser;
        },
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.entityManager.findOneBy(User, { id });

      if (!user) {
        throw new RpcException('USER_NOT_FOUND');
      }

      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.entityManager.find(User);

      return users || [];
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await this.findOne(id);

          await transactionalEntityManager.update(Student, id, updateUserDto);

          const updatedUser = await this.findOne(id);

          return updatedUser;
        },
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await this.findOne(id);

          const deletedResult = await transactionalEntityManager.delete(
            Student,
            id,
          );

          return deletedResult;
        },
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findUserCreate(
    email: string,
    cpf: string,
    phone: string,
  ): Promise<User | undefined> {
    try {
      const users = await this.entityManager.findOne(User, {
        where: { email, cpf, phone },
      });

      if (users) {
        return users;
      }
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
