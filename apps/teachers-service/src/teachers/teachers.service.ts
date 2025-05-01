import { Injectable } from '@nestjs/common';
// noinspection ES6PreferShortImport
import { CreateTeacherDto, UpdateTeacherDto } from '@repo/dtos/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { Teacher } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    try {
      const existingTeacher = await this.prisma.teacher.findFirst({
        where: {
          OR: [
            { email: createTeacherDto.email },
            { phone: createTeacherDto.phone },
          ],
        },
      });
      if (existingTeacher) {
        if (existingTeacher.email === createTeacherDto.email) {
          throw new RpcException('EMAIL_ALREADY_EXISTS');
        }
        if (existingTeacher.phone === createTeacherDto.phone) {
          throw new RpcException('PHONE_ALREADY_EXISTS');
        }
      }
      return this.prisma.teacher.create({
        data: { ...createTeacherDto },
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(): Promise<Teacher[]> {
    try {
      return this.prisma.teacher.findMany({});
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<Teacher> {
    try {
      const teacher = await this.prisma.teacher.findUnique({ where: { id } });
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
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    try {
      const existingTeacher = await this.prisma.teacher.findFirst({
        where: {
          OR: [
            { email: updateTeacherDto.email },
            { phone: updateTeacherDto.phone },
          ],
          NOT: { id: id },
        },
      });
      if (existingTeacher) {
        if (existingTeacher.email === updateTeacherDto.email) {
          throw new RpcException('EMAIL_ALREADY_EXISTS');
        }
        if (existingTeacher.phone === updateTeacherDto.phone) {
          throw new RpcException('PHONE_ALREADY_EXISTS');
        }
      }
      return this.prisma.teacher.update({
        where: { id },
        data: updateTeacherDto,
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string): Promise<Teacher> {
    try {
      const teacher = await this.prisma.teacher.findUnique({ where: { id } });
      if (!teacher) {
        throw new RpcException('TEACHER_NOT_FOUND');
      }
      return this.prisma.teacher.delete({ where: { id } });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
