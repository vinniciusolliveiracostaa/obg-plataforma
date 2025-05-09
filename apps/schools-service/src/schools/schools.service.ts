import { Injectable } from '@nestjs/common';
import { CreateSchoolDto, UpdateSchoolDto } from '@repo/dtos';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { School } from 'generated/prisma';
import * as csv from 'csv-parser';
import { Readable } from 'stream';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingSchool = await tx.school.findUnique({
          where: { inep: createSchoolDto.inep },
        });

        if (existingSchool) {
          throw new RpcException('SCHOOL_ALREADY_EXISTS');
        }

        return tx.school.create({
          data: {
            ...createSchoolDto,
          },
        });
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  async findAll(): Promise<School[]> {
    try {
      return await this.prisma.school.findMany();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  async findOne(id: string): Promise<School> {
    try {
      const school = await this.prisma.school.findUnique({ where: { id: id } });

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
      return await this.prisma.$transaction(async (tx) => {
        // Check if the school exists
        const existingSchool = await tx.school.findUnique({
          where: { id: id },
        });

        if (!existingSchool) {
          throw new RpcException('SCHOOL_NOT_FOUND');
        }

        // Update the school
        return tx.school.update({
          where: { id },
          data: { ...updateSchoolDto },
        });
      });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  async remove(id: string): Promise<{ message: string }> {
    try {
      await this.prisma.$transaction(async (tx) => {
        // Check if the school exists
        const existingSchool = await tx.school.findUnique({
          where: { id: id },
        });

        if (!existingSchool) {
          throw new RpcException('SCHOOL_NOT_FOUND');
        }

        // Delete the school
        await tx.school.delete({ where: { id } });
      });

      return { message: 'SCHOOL_REMOVED_SUCCESSFULLY' };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async bulkCreate(
    fileBuffer: Buffer,
  ): Promise<{ created: number; errors: any[] }> {
    console.log('Starting bulk create...');
    try {
      const parsedSchools = await this.parseCSV(fileBuffer);
      const { valid: validSchools, errors: validationErrors } =
        await this.validateSchools(parsedSchools);

      const nonDuplicateSchools = await this.filterDuplicates(
        validSchools,
        this.prisma.school,
      );

      // Processa os registros em lotes
      const batchSize = 1000;
      const batches = this.chunkArray(nonDuplicateSchools, batchSize);

      let createdCount = 0;

      await this.prisma.$transaction(async (tx) => {
        for (const batch of batches) {
          const result = await tx.school.createMany({
            data: batch,
            skipDuplicates: true,
          });
          createdCount += result.count;
        }
      });

      return { created: createdCount, errors: validationErrors };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  private async parseCSV(fileBuffer: Buffer): Promise<CreateSchoolDto[]> {
    console.log('Parsing CSV...');
    const schools: CreateSchoolDto[] = [];
    const stream = Readable.from(fileBuffer); // Não converta para string, mantenha como stream binário

    return new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (row) => {
          try {
            const school: CreateSchoolDto = plainToInstance(
              CreateSchoolDto,
              row,
            );
            schools.push(school);
          } catch (error) {
            reject(new RpcException(`Error Parsing CSV: ${error.message}`));
          }
        })
        .on('end', () => resolve(schools))
        .on('error', (error) =>
          reject(new RpcException(`CSV Parsing Error: ${error.message}`)),
        );
    });
  }

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    console.log('Chunking array...');
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  }

  private async validateSchools(schools: CreateSchoolDto[]): Promise<{
    valid: CreateSchoolDto[];
    errors: any[];
  }> {
    const validationResults = await Promise.all(
      schools.map(async (school) => {
        const validationErrors = await validate(school);
        if (validationErrors.length > 0) {
          return { valid: false, school, errors: validationErrors };
        }
        return { valid: true, school };
      }),
    );

    const validSchools = validationResults
      .filter((result) => result.valid)
      .map((result) => result.school);
    const errors = validationResults
      .filter((result) => !result.valid)
      .map((result) => ({ school: result.school, errors: result.errors }));

    return { valid: validSchools, errors };
  }

  private async filterDuplicates(
    schools: CreateSchoolDto[],
    tx: PrismaService['school'],
  ): Promise<CreateSchoolDto[]> {
    console.log('Filtering duplicates...');
    const ineps = schools.map((school) => school.inep);
    const existingSchools = await tx.findMany({
      where: { inep: { in: ineps } },
      select: { inep: true },
    });
    const existingIneps = new Set(existingSchools.map((school) => school.inep));
    return schools.filter((school) => !existingIneps.has(school.inep));
  }
}
