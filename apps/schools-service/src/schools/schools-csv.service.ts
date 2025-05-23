import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChunkMetadata, FileChunks } from '@obg/interfaces';
import { RpcException } from '@nestjs/microservices';
import { CreateSchoolDto, createSchoolSchema } from '@obg/schemas';
import { Readable } from 'stream';
import * as fs from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class SchoolsCsvService {
  private fileChunks: FileChunks = {};

  constructor(private prisma: PrismaService) {}

  async upload(data: { metadata: ChunkMetadata; data: string }) {
    console.log('Processing chunk data...', data.metadata.originalName);
    const { metadata, data: chunkData } = data;
    const { fileId, chunkIndex, totalChunks, originalName } = metadata;

    // Inicializar estrutura de armazenamento para o arquivo, se necessário
    if (!this.fileChunks[fileId]) {
      this.fileChunks[fileId] = {
        chunks: new Map<number, string>(),
        totalChunks,
        originalName,
      };
    }

    // Armazenar o chunk
    this.fileChunks[fileId].chunks.set(chunkIndex, chunkData);

    // Verificar se todos os chunks foram recebidos
    if (this.fileChunks[fileId].chunks.size === totalChunks) {
      console.log(
        `Todos os chunks recebidos para o arquivo ${fileId}. Processando...`,
      );
      const filePath = await this.recomposeFile(fileId); // Recompõe e salva o arquivo no disco
      await this.processCsv(filePath); // Processa o arquivo CSV recombinado
      delete this.fileChunks[fileId]; // Limpa os dados do arquivo após o processamento
    }
  }

  private async bulkCreate(
    fileBuffer: Buffer,
  ): Promise<{ created: number; errors: any[] }> {
    console.log('Starting bulk create...');
    try {
      const parsedSchools = await this.parseCsv(fileBuffer);
      const { valid: validSchools, errors: validationErrors } =
        await this.validateSchools(parsedSchools);

      const nonDuplicatedSchools = await this.filterDuplicates(
        validSchools,
        this.prisma.school,
      );

      // Processa os registros em lotes
      const batchSize = 2000;
      const batches = this.chunkArray(nonDuplicatedSchools, batchSize);

      let createdCount = 0;

      await this.prisma.$transaction(async (tx) => {
        for (const batch of batches) {
          const result = await tx.school.createMany({
            data: batch,
            skipDuplicates: true, // Ignora duplicatas
          });
          createdCount += result.count; // Soma os registros criados
        }
      });
      // Retorna o número de registros criados e os erros de validação
      return { created: createdCount, errors: validationErrors };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  private async recomposeFile(fileId: string): Promise<string> {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Cria o diretório se não existir
    }

    const fileData = this.fileChunks[fileId];
    const { chunks, originalName } = fileData;

    // Ordenar e recombinar os chunks
    const sortedChunks = Array.from(chunks.entries())
      .sort(([indexA], [indexB]) => indexA - indexB)
      .map(([, chunkData]) => Buffer.from(chunkData, 'base64'));

    const fileBuffer = Buffer.concat(sortedChunks);

    // Salvar o arquivo recombinado
    const filePath = `${uploadDir}/${originalName}`;
    fs.writeFileSync(filePath, fileBuffer);
    console.log(`Arquivo salvo em: ${filePath}`);
    return filePath;
  }

  private async processCsv(filePath: string): Promise<void> {
    const fileBuffer = fs.readFileSync(filePath);

    // Chama o método bulkCreate para processar os dados no banco de dados

    const result = await this.bulkCreate(fileBuffer);

    console.log(
      `Processamento concluído: ${result.created} registros inseridos. ${result.errors.length} erros encontrados.`,
    );

    // Remove o arquivo após o processamento
    fs.unlinkSync(filePath);
  }

  private async parseCsv(fileBuffer: Buffer): Promise<CreateSchoolDto[]> {
    console.log('Parsing CSV...');
    const schools: CreateSchoolDto[] = [];
    const stream = Readable.from(fileBuffer); // Não converter para string, manter como stream binário

    return new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (row) => {
          try {
            const schoolData = this.mapCsvRow(row);
            const parsed = createSchoolSchema.parse(schoolData);
            schools.push(parsed);
          } catch (error) {
            reject(new RpcException(`Erro ao processar Csv: ${error.message}`));
          }
        })
        .on('end', () => resolve(schools))
        .on('error', (error) =>
          reject(new RpcException(`Erro ao processar Csv: ${error.message}`)),
        );
    });
  }

  private mapCsvRow(row: any): Partial<CreateSchoolDto> {
    return {
      serviceRestriction: row['﻿Restrição de Atendimento'],
      name: row['Escola'],
      inep: row['Código INEP'],
      uf: row['UF'],
      city: row['Município'],
      location: row['Localização'],
      locality: row['Localidade Diferenciada'],
      administrativeCategory: row['Categoria Administrativa'],
      address: row['Endereço'],
      phone: row['Telefone'],
      administrativeDependence: row['Dependência Administrativa'],
      privateCategory: row['Categoria Escola Privada'],
      publicPowerAgreement: row['Conveniada Poder Público'],
      regulation: row['Regulamentação pelo Conselho de Educação'],
      size: row['Porte da Escola'],
      teachingModalityStage: row['Etapas e Modalidade de Ensino Oferecidas'],
      otherOffers: row['Outras Ofertas Educacionais'],
      latitude: row['Latitude'],
      longitude: row['Longitude'],
    };
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

  private async validateSchools(
    schools: CreateSchoolDto[],
  ): Promise<{ valid: CreateSchoolDto[]; errors: any }> {
    const validationResults = await Promise.all(
      schools.map(async (school) => {
        const parsed = createSchoolSchema.safeParse(school);
        return parsed.success
          ? { valid: true, school: parsed.data }
          : { valid: false, school, errors: parsed.error.errors };
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
