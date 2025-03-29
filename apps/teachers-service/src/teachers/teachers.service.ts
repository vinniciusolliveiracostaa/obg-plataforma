import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { createId } from '@paralleldrive/cuid2';
import { lastValueFrom } from 'rxjs';
import { Teacher } from '@repo/entities/index';
import { CreateTeacherDto, UpdateTeacherDto } from '@repo/dtos/index';
import { ClientNats, RpcException } from '@nestjs/microservices';

@Injectable()
export class TeachersService {
  constructor(
    @Inject('SCHOOLS_SERVICE_TEACHER_SERVICE_CONSUMER')
    private readonly client: ClientNats,
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

      await lastValueFrom(
        this.client.send('findOneSchool', createTeacherDto.schoolId),
      );

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

      // Verifica se o email já existe
      if (updateTeacherDto.email) {
        const studentExists = await this.teacherRepository.findOneBy({
          email: updateTeacherDto.email,
        });
        if (studentExists) {
          throw new RpcException('STUDENT_ALREADY_EXISTS');
        }
      }

      // Verifica se a escola está sendo atualizada
      if (updateTeacherDto.schoolId) {
        const schoolExists = await lastValueFrom(
          this.client.send('findOneSchool', updateTeacherDto.schoolId),
        );
        if (!schoolExists) {
          throw new RpcException('SCHOOL_NOT_FOUND');
        }
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

  async remove(id: string): Promise<DeleteResult> {
    try {
      const teacher = await this.teacherRepository.findOneBy({ id });

      if (!teacher) {
        throw new RpcException('TEACHER_NOT_FOUND');
      }

      const deletedTeacher = await this.entityManager.delete(Teacher, id);

      return deletedTeacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
