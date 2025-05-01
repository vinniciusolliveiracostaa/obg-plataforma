// noinspection ES6PreferShortImport

import { Injectable } from '@nestjs/common';
import { CreateSchoolDto, UpdateSchoolDto } from '@repo/dtos/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { School } from 'generated/prisma';

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    try {
      const existingSchool = await this.prisma.school.findFirst({
        where: {
          OR: [
            { email: createSchoolDto.email },
            { phone: createSchoolDto.phone },
          ],
        },
      });
      if (existingSchool) {
        if (existingSchool.email === createSchoolDto.email) {
          throw new RpcException('EMAIL_ALREADY_EXISTS');
        }
        if (existingSchool.phone === createSchoolDto.phone) {
          throw new RpcException('PHONE_ALREADY_EXISTS');
        }
      }
      return this.prisma.school.create({
        data: { ...createSchoolDto },
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(): Promise<School[]> {
    try {
      return this.prisma.school.findMany({});
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string): Promise<School> {
    try {
      const school = await this.prisma.school.findUnique({ where: { id } });
      if (!school) {
        throw new RpcException('SCHOOL_NOT_FOUND');
      }
      return school;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    try {
      const existingSchool = await this.prisma.school.findFirst({
        where: {
          OR: [
            { email: updateSchoolDto.email },
            { phone: updateSchoolDto.phone },
          ],
          NOT: { id: id },
        },
      });
      if (existingSchool) {
        if (existingSchool.email === updateSchoolDto.email) {
          throw new RpcException('EMAIL_ALREADY_EXISTS');
        }
        if (existingSchool.phone === updateSchoolDto.phone) {
          throw new RpcException('PHONE_ALREADY_EXISTS');
        }
      }
      return this.prisma.school.update({
        where: { id },
        data: updateSchoolDto,
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string): Promise<School> {
    try {
      const school = await this.prisma.school.findUnique({ where: { id } });
      if (!school) {
        throw new RpcException('SCHOOL_NOT_FOUND');
      }
      return this.prisma.school.delete({ where: { id } });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
