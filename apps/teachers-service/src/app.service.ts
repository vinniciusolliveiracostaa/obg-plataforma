import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { TeacherUserDto, UpdateTeacherUserDto } from '@obg/schemas';
import { PrismaService } from './prisma/prisma.service';
import { SpecialCategoriesType } from '@obg/enums';
import { SpecialCategories, Teacher } from 'generated/prisma';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject('TEACHERS_SERVICE_PROVIDER') private client: ClientProxy,
  ) {}

  async create(teacherUserDto: TeacherUserDto): Promise<Teacher> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingTeacher = await tx.teacher.findUnique({
          where: { email: teacherUserDto.email },
        });

        if (existingTeacher) {
          throw new RpcException('TEACHER_ALREADY_EXISTS');
        }

        // Verificar existência da escola
        await lastValueFrom(
          this.client.send('findManySchools', teacherUserDto.schoolsId),
        );

        const mapToSpecialCategories = (
          categories: SpecialCategoriesType[],
        ): SpecialCategories[] => {
          return categories as unknown as SpecialCategories[];
        };

        const createdTeacher = await tx.teacher.create({
          data: {
            id: teacherUserDto.id,
            name: teacherUserDto.name,
            email: teacherUserDto.email,
            cpf: teacherUserDto.cpf,
            phone: teacherUserDto.phone,
            birthDate: teacherUserDto.birthDate,
            gender: teacherUserDto.gender,
            colorRace: teacherUserDto.colorRace,
            specialCategories: mapToSpecialCategories(
              teacherUserDto.specialCategories,
            ),
            schoolsId: teacherUserDto.schoolsId,
            teamsId: teacherUserDto.teamsId,
          },
        });

        this.client.emit('teacherCreated', createdTeacher);

        return createdTeacher;
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<{ data: Teacher[]; total: number; totalPages: number }> {
    const MAX_PAGE_SIZE = 1000;
    try {
      page = parseInt(page as unknown as string);
      pageSize = parseInt(pageSize as unknown as string);
      if (pageSize > MAX_PAGE_SIZE) {
        throw new RpcException(
          `O tamanho máximo da página é ${MAX_PAGE_SIZE}.`,
        );
      }

      const total = await this.prisma.teacher.count(); // Conta o total de registros
      const skip = (page - 1) * pageSize; // Calcula o número de registros a serem pulados

      const data = await this.prisma.teacher.findMany({ skip, take: pageSize });

      const totalPages = Math.ceil(total / pageSize);

      const result = { data, total, totalPages };

      return result;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<Teacher> {
    try {
      const teacher = await this.prisma.teacher.findUnique({
        where: { id: id },
      });

      if (!teacher) {
        throw new RpcException('TEACHER_NOT_FOUND');
      }

      return teacher;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(
    id: string,
    updateTeacherUserDto: UpdateTeacherUserDto,
  ): Promise<Teacher> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Verifica se o professor existe
        const existingTeacher = await tx.teacher.findUnique({
          where: { id: id },
        });

        if (!existingTeacher) {
          throw new RpcException('TEACHER_NOT_FOUND');
        }

        // Caso o email tenha sido alterado, verifica se já existe outro professor com o mesmo email
        if (updateTeacherUserDto.email) {
          const existingEmailTeacher = await tx.teacher.findFirst({
            where: {
              AND: [{ email: updateTeacherUserDto.email }, { id: { not: id } }],
            },
          });

          if (existingEmailTeacher) {
            throw new RpcException('EMAIL_ALREADY_IN_USE');
          }
        }

        // Caso a escola tenha sido alterada, verifica se a escola existe
        if (updateTeacherUserDto.schoolsId) {
          await lastValueFrom(
            this.client.send('findManySchools', updateTeacherUserDto.schoolsId),
          );
        }

        const updatedTeacher = tx.teacher.update({
          where: { id: id },
          data: {
            ...updateTeacherUserDto,
          },
        });
        this.client.emit('teacherUpdated', updatedTeacher);
        return updatedTeacher;
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Verifica se o professor existe
        const existingTeacher = await tx.teacher.findUnique({
          where: { id: id },
        });

        if (!existingTeacher) {
          throw new RpcException('TEACHER_NOT_FOUND');
        }

        // Remove o professor
        await tx.teacher.delete({
          where: { id: id },
        });

        this.client.emit('teacherDeleted', { id });

        return { message: 'TEACHER_REMOVED_SUCCESSFULLY' };
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}