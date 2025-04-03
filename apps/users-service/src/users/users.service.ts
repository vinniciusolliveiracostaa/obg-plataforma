import { Inject, Injectable } from '@nestjs/common';
import { ClientNats, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { createId } from '@paralleldrive/cuid2';
import { lastValueFrom } from 'rxjs';

import { CreateUserDto, UpdateUserDto } from '@repo/dtos/index';
import { User } from '@repo/entities/index';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_SERVICE_CONSUMER') private readonly client: ClientNats,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(CreateUserDto: CreateUserDto) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const existingUser = await this.findCreateUser(
          CreateUserDto.email,
          CreateUserDto.cpf,
          CreateUserDto.phone,
        );
        if (existingUser) {
          throw new RpcException('USER_ALREADY_EXISTS');
        }
        const user = new User({
          ...CreateUserDto,
          id: createId(),
        });

        const newUser = await transactionalEntityManager.save(User, user);

        if (!newUser) {
          throw new RpcException('USER_NOT_CREATED');
        }

        return newUser;
      },
    );
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const existingUser = this.findOne(id);
        if (!existingUser) {
          throw new RpcException('USER_NOT_FOUND');
        }

        await transactionalEntityManager.update(User, id, updateUserDto);

        const payload = { id, updateUserDto };
        await lastValueFrom(this.client.send('updateStudent', { payload }));

        const updatedUser = await this.findOne(id);

        if (!updatedUser) {
          throw new RpcException('USER_NOT_FOUND');
        }
        return updatedUser;
      },
    );
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const existingUser = await this.findOne(id);
        if (!existingUser) {
          throw new RpcException('USER_NOT_FOUND');
        }

        const payload = { id };
        await lastValueFrom(this.client.send('deleteStudent', { payload }));

        const deleteResult = await transactionalEntityManager.delete(User, id);

        if (deleteResult.affected === 0) {
          throw new RpcException('USER_NOT_DELETED');
        }
        return deleteResult;
      },
    );
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      if (!users) {
        throw new RpcException('USERS_NOT_FOUND');
      }
      return users || [];
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      // Verifica se o usuário existe
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new RpcException('USER_NOT_FOUND');
      }
      // Retorna o usuário encontrado
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  private async findCreateUser(email: string, cpf: string, phone: string) {
    const user = await this.userRepository.findOne({
      where: [{ email }, { cpf }, { phone }],
    });
    if (user) {
      return user;
    }
  }
}
