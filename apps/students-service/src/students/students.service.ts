import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { createId } from '@paralleldrive/cuid2';
import { RpcException } from '@nestjs/microservices';

import { Student } from '@repo/entities/index';
import { CreateStudentDto, UpdateStudentDto } from '@repo/dtos/index';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly entityManager: EntityManager,
  ) {}

  // Criar um estudante

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const student = new Student({
        ...createStudentDto,
        id: createId(),
      });

      const createdStudent = await this.entityManager.save(student);

      return createdStudent;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Listar todos os estudantes

  async findAll(): Promise<Student[]> {
    try {
      const students = await this.studentRepository.find();

      if (students.length === 0) {
        throw new RpcException('STUDENTS_NOT_FOUND');
      }

      return students;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Listar um estudante pelo ID

  async findOne(id: string): Promise<Student> {
    try {
      const student = await this.studentRepository.findOneBy({ id });

      if (!student) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      return student;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Atualizar um estudante

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    try {
      const student = await this.studentRepository.findOneBy({ id });

      if (!student) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      await this.entityManager.update(Student, id, updateStudentDto);

      const updatedStudent = await this.studentRepository.findOneBy({ id });
      if (!updatedStudent) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      return updatedStudent;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Deletar um estudante

  async remove(id: string): Promise<void> {
    try {
      const student = await this.studentRepository.findOneBy({ id });

      if (!student) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }

      await this.entityManager.delete(Student, id);

      return;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
