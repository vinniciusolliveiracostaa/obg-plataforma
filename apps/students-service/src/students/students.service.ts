import { Injectable, Inject } from '@nestjs/common';
import { ClientNats, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { createId } from '@paralleldrive/cuid2';

import { CreateStudentDto, UpdateStudentDto } from '@repo/dtos/index';
import { Student } from '@repo/entities/index';

@Injectable()
export class StudentsService {
  constructor(
    @Inject('STUDENTS_SERVICE_CONSUMER') private readonly client: ClientNats,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const existingStudent = await this.findCreateStudent(
          createStudentDto.email,
          createStudentDto.cpf,
          createStudentDto.phone,
        );
        if (existingStudent) {
          throw new RpcException('STUDENT_ALREADY_EXISTS');
        }

        const extingSchool = await lastValueFrom(
          this.client.send('findOneSchool', createStudentDto.schoolId),
        );

        if (!extingSchool) {
          throw new RpcException('SCHOOL_NOT_FOUND');
        }

        const createStudentUser = await lastValueFrom(
          this.client.send('createUser', createStudentDto),
        );

        if (!createStudentUser) {
          throw new RpcException('USER_NOT_CREATED');
        }

        const student = new Student({
          ...createStudentDto,
          id: createId(),
          userId: createStudentUser.id,
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
  }

  async findAll(): Promise<Student[]> {
    const students = await this.studentRepository.find();
    if (!students) {
      throw new RpcException('STUDENTS_NOT_FOUND');
    }
    return students;
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const existingStudent = await this.findOne(id);
        if (!existingStudent) {
          throw new RpcException('STUDENT_NOT_FOUND');
        }

        await transactionalEntityManager.update(Student, id, updateStudentDto);

        const payload = { id, updateStudentDto };
        await lastValueFrom(this.client.send('updateUser', { payload }));

        const updatedStudent = await this.findOne(id);

        if (!updatedStudent) {
          throw new RpcException('STUDENT_NOT_FOUND');
        }

        return updatedStudent;
      },
    );
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const existingStudent = await this.findOne(id);
        if (!existingStudent) {
          throw new RpcException('STUDENT_NOT_FOUND');
        }

        const payload = { id };
        await lastValueFrom(this.client.send('deleteUser', { payload }));

        const deleteResult = await transactionalEntityManager.delete(
          Student,
          id,
        );

        if (deleteResult.affected === 0) {
          throw new RpcException('STUDENT_NOT_DELETED');
        }
        return deleteResult;
      },
    );
  }

  async findOne(id: string): Promise<Student> {
    try {
      // Verifica se o estudante existe
      const student = await this.studentRepository.findOne({
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

  private async findCreateStudent(email: string, cpf: string, phone: string) {
    const student = await this.studentRepository.findOne({
      where: [{ email }, { cpf }, { phone }],
    });
    if (student) {
      return student;
    }
  }

  async findOneByCpf(cpf: string): Promise<Student> {
    return this.findOneByField('cpf', cpf);
  }

  async findOneByEmail(email: string): Promise<Student> {
    return this.findOneByField('email', email);
  }

  async findOneByPhone(phone: string): Promise<Student> {
    return this.findOneByField('phone', phone);
  }

  private async findOneByField(
    field: keyof Student,
    value: string,
  ): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { [field]: value },
    });
    if (!student) {
      throw new RpcException('STUDENT_NOT_FOUND');
    }
    return student;
  }
}
