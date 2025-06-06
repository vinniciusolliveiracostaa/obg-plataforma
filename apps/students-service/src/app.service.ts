import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { StudentUserDto, UpdateStudentUserDto } from '@obg/schemas';
import { PrismaService } from './prisma/prisma.service';
import { SpecialCategoriesType } from '@obg/enums';
import { SpecialCategories, Student } from 'generated/prisma';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject('STUDENTS_SERVICE_PROVIDER') private client: ClientProxy,
  ) {}

  async create(studentUserDto: StudentUserDto): Promise<Student> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const mapToSpecialCategories = (
          categories: SpecialCategoriesType[],
        ): SpecialCategories[] => {
          return categories as unknown as SpecialCategories[];
        };

        const createdStudent = await tx.student.create({
          data: {
            id: studentUserDto.id,
            name: studentUserDto.name,
            email: studentUserDto.email,
            cpf: studentUserDto.cpf,
            nis: studentUserDto.nis,
            motherName: studentUserDto.motherName,
            phone: studentUserDto.phone,
            birthDate: studentUserDto.birthDate,
            levelOfEducation: studentUserDto.levelOfEducation,
            gender: studentUserDto.gender,
            colorRace: studentUserDto.colorRace,
            specialCategories: mapToSpecialCategories(
              studentUserDto.specialCategories,
            ),
            schoolId: studentUserDto.schoolId,
            teamId: studentUserDto.teamId,
          },
        });

        this.client.emit('studentCreated', createdStudent);

        return createdStudent;
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<{ data: Student[]; total: number; totalPages: number }> {
    const MAX_PAGE_SIZE = 1000;
    try {
      page = parseInt(page as unknown as string);
      pageSize = parseInt(pageSize as unknown as string);
      if (pageSize > MAX_PAGE_SIZE) {
        throw new RpcException('PAGE_SIZE_TOO_LARGE');
      }

      const total = await this.prisma.student.count(); // Conta o total de registros
      const skip = (page - 1) * pageSize; // Calcula o número de registros a serem pulados

      const data = await this.prisma.student.findMany({ skip, take: pageSize });

      const totalPages = Math.ceil(total / pageSize);

      const result = { data, total, totalPages };

      return result;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<Student> {
    try {
      const student = await this.prisma.student.findUnique({
        where: { id: id },
      });

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
    updateStudentUserDto: UpdateStudentUserDto,
  ): Promise<Student> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const mapToSpecialCategories = (
          categories: SpecialCategoriesType[],
        ): SpecialCategories[] => {
          return categories as unknown as SpecialCategories[];
        };

        if (updateStudentUserDto.specialCategories !== undefined) {
          updateStudentUserDto.specialCategories = mapToSpecialCategories(
            updateStudentUserDto.specialCategories,
          );
        }

        const updatedStudent = await tx.student.update({
          where: { id: id },
          data: {
            ...updateStudentUserDto,
          },
        });

        this.client.emit('studentUpdated', updatedStudent);

        return updatedStudent;
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.student.delete({ where: { id: id } });

        this.client.emit('studentDeleted', id);

        return { message: 'STUDENT_REMOVED_SUCCESSFULLY' };
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}