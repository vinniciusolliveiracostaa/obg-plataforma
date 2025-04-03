import { Injectable, Inject } from '@nestjs/common';
import { ClientNats, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { createId } from '@paralleldrive/cuid2';

import {
  CreateStudentDto,
  CreateUserDto,
  UpdateStudentDto,
} from '@repo/dtos/index';
import { School, Student, User } from '@repo/entities/index';

@Injectable()
export class StudentsService {
  constructor(
    @Inject('STUDENTS_SERVICE_CONSUMER') private readonly client: ClientNats,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      return this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await this.findStudent(createStudentDto);
          await this.findStudentUser(createStudentDto);

          const existingSchool = await this.findExistingSchool(
            createStudentDto.schoolId,
          );
          if (!existingSchool) {
            throw new RpcException('SCHOOL_NOT_FOUND');
          }

          const createdUser = await this.createStudentUser(createStudentDto);
          if (!createdUser) {
            throw new RpcException('USER_NOT_CREATED');
          }

          const student = new Student({
            ...createStudentDto,
            id: createId(),
            userId: createdUser.id,
          });

          const newStudent = await transactionalEntityManager.save(
            Student,
            student,
          );
          if (!newStudent) {
            throw new RpcException('STUDENT_NOT_CREATED');
          }

          return newStudent;
        },
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<Student> {
    try {
      // Verifica se o estudante existe
      const student = await this.entityManager.findOne(Student, {
        where: { id },
      });
      if (!student) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }
      // Retorna o estudante encontrado
      return student;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  async findAll(): Promise<Student[]> {
    try {
      const students = await this.entityManager.find(Student, {});
      if (!students) {
        throw new RpcException('STUDENTS_NOT_FOUND');
      }
      return students || [];
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    try {
      return this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await this.findOne(id);
          await lastValueFrom(this.client.send('findUser', id));

          await transactionalEntityManager.update(
            Student,
            id,
            updateStudentDto,
          );

          const payload = { id, updateStudentDto };
          await lastValueFrom(this.client.send('updateStudent', payload));

          const updatedStudent = await this.findOne(id);

          return updatedStudent;
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

  // Private
  private async findStudent(createStudentDto: CreateStudentDto): Promise<void> {
    const payload = {
      email: createStudentDto.email,
      cpf: createStudentDto.cpf,
      phone: createStudentDto.phone,
    };

    await this.entityManager.findOneBy(Student, payload);

    if (payload) {
      throw new RpcException('STUDENT_ALREADY_EXISTS');
    }
  }

  private async findStudentUser(createUserDto: CreateUserDto): Promise<void> {
    const payload = {
      email: createUserDto.email,
      cpf: createUserDto.cpf,
      phone: createUserDto.phone,
    };

    console.log('findStudentUser', payload);

    await lastValueFrom(this.client.send('findCreateUser', payload));
    if (payload) {
      throw new RpcException('STUDENT_ALREADY_EXISTS');
    }
  }

  private async findExistingSchool(schoolId: string): Promise<School> {
    return await lastValueFrom(this.client.send('findOneSchool', schoolId));
  }

  private async createStudentUser(
    createStudentDto: CreateStudentDto,
  ): Promise<User> {
    return await lastValueFrom(
      this.client.send('createUser', createStudentDto),
    );
  }
}
