import { Injectable, Inject } from '@nestjs/common';
import { ClientNats, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { createId } from '@paralleldrive/cuid2';

import { CreateTeacherDto, UpdateTeacherDto } from '@repo/dtos/index';
import { Teacher } from '@repo/entities/index';

@Injectable()
export class TeachersService {
  constructor(
    @Inject('TEACHERS_SERVICE_CONSUMER') private readonly client: ClientNats,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const existingTeacher = await this.findCreateTeacher(
          createTeacherDto.email,
          createTeacherDto.cpf,
          createTeacherDto.phone,
        );
        if (existingTeacher) {
          throw new RpcException('TEACHER_ALREADY_EXISTS');
        }

        const extingSchool = await lastValueFrom(
          this.client.send('findOneSchool', createTeacherDto.schoolId),
        );

        if (!extingSchool) {
          throw new RpcException('SCHOOL_NOT_FOUND');
        }

        const createTeacherUser = await lastValueFrom(
          this.client.send('createUser', createTeacherDto),
        );

        if (!createTeacherUser) {
          throw new RpcException('USER_NOT_CREATED');
        }

        const teacher = new Teacher({
          ...createTeacherDto,
          id: createId(),
          userId: createTeacherUser.id,
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
  }

  async findAll(): Promise<Teacher[]> {
    const teachers = await this.teacherRepository.find();
    if (!teachers) {
      throw new RpcException('TEACHERS_NOT_FOUND');
    }
    return teachers || [];
  }

  async update(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const existingTeacher = await this.findOne(id);
        if (!existingTeacher) {
          throw new RpcException('TEACHER_NOT_FOUND');
        }

        await transactionalEntityManager.update(Teacher, id, updateTeacherDto);

        const payload = { id, updateTeacherDto };
        await lastValueFrom(this.client.send('updateUser', { payload }));

        const updatedTeacher = await this.teacherRepository.findOne({
          where: { id },
        });

        if (!updatedTeacher) {
          throw new RpcException('TEACHER_NOT_FOUND');
        }

        return updatedTeacher;
      },
    );
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const teacher = await this.findOne(id);
        if (!teacher) {
          throw new RpcException('TEACHER_NOT_FOUND');
        }

        const payload = { id };
        await lastValueFrom(this.client.send('deleteUser', { payload }));

        const deleteResult = await transactionalEntityManager.delete(
          Teacher,
          id,
        );

        if (deleteResult.affected === 0) {
          throw new RpcException('TEACHER_NOT_DELETED');
        }
        return deleteResult;
      },
    );
  }

  async findOne(id: string): Promise<Teacher> {
    try {
      // Verifica se o estudante existe
      const teacher = await this.teacherRepository.findOne({
        where: { id },
      });
      if (!teacher) {
        throw new RpcException('TEACHER_NOT_FOUND');
      }
      // Retorna o estudante encontrado
      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  private async findCreateTeacher(email: string, cpf: string, phone: string) {
    const teacher = await this.teacherRepository.findOne({
      where: [{ email }, { cpf }, { phone }],
    });
    if (teacher) {
      return teacher;
    }
  }
  // Falta implementar
  async findOneByCpf(cpf: string): Promise<Teacher> {
    return this.findOneByField('cpf', cpf);
  }
  // Falta implementar
  async findOneByEmail(email: string): Promise<Teacher> {
    return this.findOneByField('email', email);
  }
  // Falta implementar
  async findOneByPhone(phone: string): Promise<Teacher> {
    return this.findOneByField('phone', phone);
  }

  private async findOneByField(
    field: keyof Teacher,
    value: string,
  ): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({
      where: { [field]: value },
    });
    if (!teacher) {
      throw new RpcException('TEACHER_NOT_FOUND');
    }
    return teacher;
  }
}
