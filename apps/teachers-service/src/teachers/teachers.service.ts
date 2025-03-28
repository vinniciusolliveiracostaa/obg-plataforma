import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { createId } from '@paralleldrive/cuid2';

import { Teacher } from '@repo/entities/index';
import { CreateTeacherDto, UpdateTeacherDto } from '@repo/dtos/index';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    private readonly entityManager: EntityManager,
  ) {}

  // Criar um professor

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    try {
      const teacherExists = await this.teacherRepository.findOneBy({
        email: createTeacherDto.email,
      });

      if (teacherExists) {
        throw new RpcException('TEACHER_ALREADY_EXISTS');
      }

      const teacher = new Teacher({
        ...createTeacherDto,
        id: createId(),
      });

      const createdTeacher = await this.entityManager.save(teacher);

      return createdTeacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Listar todos os professores

  async findAll(): Promise<Teacher[]> {
    try {
      const teachers = await this.teacherRepository.find();

      if (teachers.length === 0) {
        throw new RpcException('TEACHERS_NOT_FOUND');
      }

      return teachers;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Listar um professor pelo ID

  async findOne(id: string): Promise<Teacher> {
    try {
      const teacher = await this.teacherRepository.findOneBy({ id });

      if (!teacher) {
        throw new RpcException('TEACHER_NOT_FOUND');
      }

      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Atualizar um professor

  async update(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    try {
      const teacher = await this.teacherRepository.findOneBy({ id });

      if (!teacher) {
        throw new RpcException('TEACHER_NOT_FOUND');
      }

      await this.entityManager.update(Teacher, id, updateTeacherDto);

      const updateTeacher = await this.teacherRepository.findOneBy({ id });

      if (!updateTeacher) {
        throw new RpcException('TEACHER_NOT_FOUND');
      }

      return updateTeacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Deletar um professor

  async remove(id: string): Promise<void> {
    try {
      const teacher = await this.teacherRepository.findOneBy({ id });

      if (!teacher) {
        throw new RpcException('TEACHER_NOT_FOUND');
      }

      await this.entityManager.delete(Teacher, id);

      return;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
