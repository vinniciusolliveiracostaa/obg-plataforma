import { Injectable, Inject } from '@nestjs/common';
import { ClientNats, RpcException } from '@nestjs/microservices';
import { DeleteResult, EntityManager } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { createId } from '@paralleldrive/cuid2';

import {
  CreateUserDto,
  CreateTeacherDto,
  UpdateTeacherDto,
} from '@repo/dtos/index';
import { Teacher, User } from '@repo/entities/index';

@Injectable()
export class TeachersService {
  constructor(
    @Inject('TEACHERS_SERVICE_CONSUMER') private readonly client: ClientNats,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    try {
      return this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await this.findTeacher(createTeacherDto);
          await this.findTeacherUser(createTeacherDto);

          const existingSchool = await this.findExistingSchool(
            createTeacherDto.schoolId,
          );
          if (!existingSchool) {
            throw new RpcException('SCHOOL_NOT_FOUND');
          }

          const createdUser = await this.createTeacherUser(createTeacherDto);
          if (!createdUser) {
            throw new RpcException('USER_NOT_CREATED');
          }

          const teacher = new Teacher({
            ...createTeacherDto,
            id: createId(),
            userId: createdUser.id,
          });

          const newTeacher = await transactionalEntityManager.save(
            Teacher,
            teacher,
          );
          if (!newTeacher) {
            throw new RpcException('TEACHER_NOT_CREATED');
          }

          return newTeacher;
        },
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<Teacher> {
    try {
      // Verifica se o professor existe
      const teacher = await this.entityManager.findOne(Teacher, {
        where: { id },
      });
      if (!teacher) {
        throw new RpcException('TEACHER_NOT_FOUND');
      }
      // Retorna o professor encontrado
      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  async findAll(): Promise<Teacher[]> {
    try {
      const teachers = await this.entityManager.find(Teacher, {});
      if (!teachers) {
        throw new RpcException('TEACHERS_NOT_FOUND');
      }
      return teachers || [];
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    try {
      return this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await this.findOne(id);
          await lastValueFrom(this.client.send('findUser', id));

          await transactionalEntityManager.update(
            Teacher,
            id,
            updateTeacherDto,
          );

          const payload = { id, updateTeacherDto };
          await lastValueFrom(this.client.send('updateTeacher', payload));

          const updatedTeacher = await this.findOne(id);

          return updatedTeacher;
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
          await lastValueFrom(this.client.send('findUser', id));

          const payload = { id };
          await lastValueFrom(this.client.send('deleteUser', payload));

          const deletedResult = await transactionalEntityManager.delete(
            Teacher,
            id,
          );

          return deletedResult;
        },
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAllTeachersBySchool(schoolId: string) {
    try {
      const teacherBySchool = await this.entityManager.findBy(Teacher, {
        schoolId,
      });

      return teacherBySchool;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Private
  private async findTeacher(createTeacherDto: CreateTeacherDto): Promise<void> {
    const payload = {
      email: createTeacherDto.email,
      cpf: createTeacherDto.cpf,
      phone: createTeacherDto.phone,
    };

    const findTeacher = await this.entityManager.findOneBy(Teacher, payload);

    if (findTeacher) {
      throw new RpcException('TEACHER_ALREADY_EXISTS');
    }
  }

  private async findTeacherUser(createUserDto: CreateUserDto): Promise<void> {
    const payload = {
      email: createUserDto.email,
      cpf: createUserDto.cpf,
      phone: createUserDto.phone,
    };

    console.log('findTeacherUser', payload);

    const findTeacherUser = await lastValueFrom(
      this.client.send('findCreateUser', payload),
    );
    if (findTeacherUser) {
      throw new RpcException('TEACHER_ALREADY_EXISTS');
    }
  }

  private async findExistingSchool(schoolId: string): Promise<Teacher> {
    return await lastValueFrom(this.client.send('findOneSchool', schoolId));
  }

  private async createTeacherUser(
    createTeacherDto: CreateTeacherDto,
  ): Promise<User> {
    return await lastValueFrom(
      this.client.send('createUser', createTeacherDto),
    );
  }
}
