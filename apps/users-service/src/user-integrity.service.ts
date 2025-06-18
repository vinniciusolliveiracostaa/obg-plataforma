import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  CreateBaseUserDto,
  RemoveBaseUserDto,
  UpdateBaseUserDto,
} from '@obg/schemas';
import { UserRole } from '@obg/enums';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserIntegrityService {
  constructor(@Inject('USERS_SERVICE_CONSUMER') private client: ClientProxy) {}

  async validateCreate(data: CreateBaseUserDto) {
    switch (data.role) {
      case UserRole.TEACHER:
        // Verificar se o professor já existe.
        const existingTeacher = await lastValueFrom(
          this.client.send('teacher.findOneByEmail', data.email),
        );
        if (existingTeacher) {
          throw new RpcException('TEACHER_ALREADY_EXISTS');
        }

        // Verificar se a(s) escola(s) existem.
        await lastValueFrom(
          this.client.send('school.findMany', data.schoolsId),
        );
        break;

      case UserRole.STUDENT:
        // Verificar se o aluno já existe.
        const existingStudent = await lastValueFrom(
          this.client.send('student.findOneByEmail', data.email),
        );
        if (existingStudent) {
          throw new RpcException('STUDENT_ALREADY_EXISTS');
        }

        // Verifica se a escola existe.
        const existingSchool = await lastValueFrom(
          this.client.send('school.findOne', data.schoolId),
        );
        if (!existingSchool) {
          throw new RpcException('SCHOOL_NOT_FOUND');
        }

        // Verifica se a equipe existe.
        const existingTeam = await lastValueFrom(
          this.client.send('team.findOne', data.teamId),
        );
        if (!existingTeam) {
          throw new RpcException('TEAM_NOT_FOUND');
        }
        break;
      default:
        break;
    }
  }

  async validateUpdate(id: string, data: UpdateBaseUserDto) {
    switch (data.role) {
      case UserRole.TEACHER:
        // Verificar se está tentando atualizar as escolas do professor.
        if (data.schoolsId) {
          // Verificar se a(s) escola(s) existem.
          await lastValueFrom(
            this.client.send('school.findMany', data.schoolsId),
          );
        }
        // Verificar se o e-mail já está em uso por outro professor.
        if (data.email) {
          const existingTeacher = await lastValueFrom(
            this.client.send('teacher.findOneByEmail', data.email),
          );
          if (existingTeacher && existingTeacher.id !== id) {
            throw new RpcException('EMAIL_ALREADY_IN_USE');
          }
        }
        break;
      case UserRole.STUDENT:
        // Verificar se está tentando atualizar a escola do aluno.
        if (data.schoolId) {
          // Verifica se a escola existe.
          const existingSchool = await lastValueFrom(
            this.client.send('school.findOne', data.schoolId),
          );
          if (!existingSchool) {
            throw new RpcException('SCHOOL_NOT_FOUND');
          }
        }

        // Verifica se está tentando atualizar a equipe do aluno.
        if (data.teamId) {
          // Verifica se a equipe existe.
          const existingTeam = await lastValueFrom(
            this.client.send('team.findOne', data.teamId),
          );
          if (!existingTeam) {
            throw new RpcException('TEAM_NOT_FOUND');
          }
        }

        // Verificar se o e-mail já está em uso por outro aluno.
        if (data.email) {
          const existingStudent = await lastValueFrom(
            this.client.send('student.findOneByEmail', data.email),
          );
          if (existingStudent && existingStudent.id !== id) {
            throw new RpcException('EMAIL_ALREADY_IN_USE');
          }
        }
        break;
      default:
        break;
    }
  }

  async validateRemove(data: RemoveBaseUserDto) {
    switch (data.role) {
      case UserRole.TEACHER:
        const teacher = await lastValueFrom(
          this.client.send('teacher.findOne', data.id),
        );
        if (!teacher) {
          throw new RpcException('TEACHER_NOT_FOUND');
        }
        if (teacher.schoolsId && teacher.schoolsId.length > 0) {
          throw new RpcException('TEACHER_CANNOT_BE_DELETED_WITH_SCHOOLS');
        }
        break;

      case UserRole.STUDENT:
        const student = await lastValueFrom(
          this.client.send('student.findOne', data.id),
        );
        if (!student) {
          throw new RpcException('STUDENT_NOT_FOUND');
        }
        if (student.schoolId) {
          throw new RpcException('STUDENT_CANNOT_BE_DELETED_WITH_SCHOOL');
        }
        if (student.teamId) {
          throw new RpcException('STUDENT_CANNOT_BE_DELETED_WITH_TEAM');
        }
        break;

      default:
        break;
    }
  }
}
