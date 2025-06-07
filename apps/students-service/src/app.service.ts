import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { StudentUserDto, Team, UpdateStudentUserDto } from '@obg/schemas';
import { PrismaService } from './prisma/prisma.service';
import { SpecialCategoriesType } from '@obg/enums';
import { SpecialCategories, Student } from 'generated/prisma';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject('STUDENTS_SERVICE_PROVIDER') private client: ClientProxy,
  ) {}

  async create(studentUserDto: StudentUserDto): Promise<Student> {
    try {
      const createdStudent = await this.prisma.$transaction(async (tx) => {
        const mapToSpecialCategories = (
          categories: SpecialCategoriesType[],
        ): SpecialCategories[] => {
          return categories as unknown as SpecialCategories[];
        };

        return await tx.student.create({
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
      });

      // Emitindo o evento de criação de estudante.
      this.client.emit('createdStudent', {
        createdStudent,
        originService: 'students-service',
        performedBy: 'system',
      });

      return createdStudent;
    } catch (error) {
      this.client.emit('failedToCreateStudent', error.message);
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
        throw new RpcException('PAGE_SIZE_EXCEEDED');
      }

      const total = await this.prisma.student.count(); // Conta o total de registros
      const skip = (page - 1) * pageSize; // Calcula o número de registros a serem pulados

      const data = await this.prisma.student.findMany({ skip, take: pageSize });

      const totalPages = Math.ceil(total / pageSize);

      const result = { data, total, totalPages };

      // Emitindo o evento de estudantes encontrados.
      this.client.emit('foundStudents', {
        data,
        originService: 'students-service',
        performedBy: 'system',
      });
      return result;
    } catch (error) {
      this.client.emit('failedToFindStudents', error.message);
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

      // Emitindo o evento de estudante encontrado.
      this.client.emit('foundStudent', {
        student,
        originService: 'students-service',
        performedBy: 'system',
      });
      return student;
    } catch (error) {
      this.client.emit('failedToFindStudent', error.message);
      throw new RpcException(error.message);
    }
  }

  async update(
    id: string,
    updateStudentUserDto: UpdateStudentUserDto,
  ): Promise<Student> {
    try {
      const updateStudent = await this.prisma.$transaction(async (tx) => {
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

        return await tx.student.update({
          where: { id: id },
          data: {
            ...updateStudentUserDto,
          },
        });
      });
      // Emitindo o evento de atualização de estudante.
      this.client.emit('updatedStudent', {
        updateStudent,
        originService: 'students-service',
        performedBy: 'system',
      });
      return updateStudent;
    } catch (error) {
      this.client.emit('failedToUpdateStudent', error.message);
      throw new RpcException(error.message);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const deleteStudent = await this.prisma.$transaction(async (tx) => {
        const existingStudent = await tx.student.findUnique({
          where: { id: id },
        });

        if (!existingStudent) {
          throw new RpcException('STUDENT_NOT_FOUND');
        }

        const findStudentTeam = await lastValueFrom(
          this.client.send('findOneTeam', existingStudent.teamId),
        );

        if (findStudentTeam) {
          throw new RpcException('STUDENT_BELONGS_TO_A_TEAM');
        }

        await tx.student.delete({ where: { id: id } });

        return existingStudent;
      });

      // Emitindo o evento de estudante removido.
      this.client.emit('deletedStudent', {
        deleteStudent,
        originService: 'students-service',
        performedBy: 'system',
      });
      return { message: 'STUDENT_REMOVED_SUCCESSFULLY' };
    } catch (error) {
      this.client.emit('failedToDeleteStudent', error.message);
      throw new RpcException(error.message);
    }
  }

  // Não concluída, mas a intenção é lidar com a remoção de estudantes quando uma equipe é excluída.
  async handleDeletedTeam(team: Team) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingStudents = await tx.student.findMany({
          where: { id: { in: team.studentsId } },
        });
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
