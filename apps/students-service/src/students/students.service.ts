import { Injectable } from '@nestjs/common';
// noinspection ES6PreferShortImport
import { CreateStudentDto, UpdateStudentDto } from '@repo/dtos/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Student } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const existingStudent = await this.prisma.student.findFirst({
        where: {
          OR: [
            { email: createStudentDto.email },
            { phone: createStudentDto.phone },
          ],
        },
      });
      if (existingStudent) {
        if (existingStudent.email === createStudentDto.email) {
          throw new RpcException('EMAIL_ALREADY_EXISTS');
        }
        if (existingStudent.phone === createStudentDto.phone) {
          throw new RpcException('PHONE_ALREADY_EXISTS');
        }
      }
      return this.prisma.student.create({
        data: { ...createStudentDto },
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(): Promise<Student[]> {
    try {
      return this.prisma.student.findMany({});
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findMany(ids: string[]): Promise<{
    found: Student[];
    notFound: string[];
  }> {
    try {
      const students = await this.prisma.student.findMany({
        where: { id: { in: ids } },
      });

      // Indentifica quais estudantes não foram encontrados
      const foundIds = students.map((student) => student.id);
      const notFoundIds = ids.filter((id) => !foundIds.includes(id));

      if (students.length === 0) {
        throw new RpcException('STUDENTS_NOT_FOUND');
      }
      return {
        found: students,
        notFound: notFoundIds,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(`DATABASE_ERROR: ${error.code}`);
      }
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<Student> {
    try {
      const student = await this.prisma.student.findUnique({ where: { id } });
      if (!student) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }
      return student;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    try {
      const existingStudent = await this.prisma.student.findFirst({
        where: {
          OR: [
            { email: updateStudentDto.email },
            { phone: updateStudentDto.phone },
          ],
          NOT: { id: id },
        },
      });
      if (existingStudent) {
        if (existingStudent.email === updateStudentDto.email) {
          throw new RpcException('EMAIL_ALREADY_EXISTS');
        }
        if (existingStudent.phone === updateStudentDto.phone) {
          throw new RpcException('PHONE_ALREADY_EXISTS');
        }
      }
      return this.prisma.student.update({
        where: { id },
        data: updateStudentDto,
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string): Promise<Student> {
    try {
      const student = await this.prisma.student.findUnique({ where: { id } });
      if (!student) {
        throw new RpcException('STUDENT_NOT_FOUND');
      }
      return this.prisma.student.delete({ where: { id } });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
