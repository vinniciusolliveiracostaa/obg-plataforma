import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateSchoolDto,
  createSchoolSchema,
  UpdateSchoolDto,
  updateSchoolSchema,
} from '@obg/schemas';
import { ZodValidationPipe } from '@obg/pipes';
import { lastValueFrom } from 'rxjs';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as cuid2 from '@paralleldrive/cuid2';
import { ChunkMetadata } from '@obg/interfaces';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Escolas')
@Controller('schools')
export class SchoolsController {
  constructor(@Inject('API_GATEWAY_CONSUMER') private cliente: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Criar Escola', description: 'Cria uma escola' })
  @UsePipes(new ZodValidationPipe(createSchoolSchema))
  async createOne(@Body() createSchoolDto: CreateSchoolDto) {
    try {
      return await lastValueFrom(
        this.cliente.send('createOneSchool', createSchoolDto),
      );
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Obter Escolas',
    description: 'Obter todas as Escolas por página e tamanho da página',
  })
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const payload = { page, pageSize };
      return await lastValueFrom(this.cliente.send('findAllSchools', payload));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter Escola',
    description: 'Obter uma escola pelo ID',
  })
  async findOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.cliente.send('findOneSchool', id));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar Escola',
    description: 'Atualiza uma escola pelo ID',
  })
  //@UsePipes
  async updateOne(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateSchoolSchema))
    updateSchoolDto: UpdateSchoolDto,
  ) {
    const payload = { id, updateSchoolDto };
    try {
      return await lastValueFrom(this.cliente.send('updateOneSchool', payload));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover Escola',
    description: 'Remove uma escola pelo ID',
  })
  async removeOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.cliente.send('removeOneSchool', id));
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_req, file, cb) => {
        if (file.mimetype !== 'text/csv') {
          return cb(
            new UnprocessableEntityException(
              `Tipo Inválido: ${file.mimetype}. Esperando: text/csv`,
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    try {
      const fileId = cuid2.createId(); // Gera um ID único(cuid2) para o arquivo
      const chunkSize = 700 * 1024; // 700 KB por chunk
      const totalChunks = Math.ceil(file.size / chunkSize); // Total de chunks

      // Divide o arquivo em chunks
      const fileBuffer = file.buffer; // O arquivo é recebido como buffer
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = fileBuffer.subarray(start, end);

        // Criar metadados do chunk
        const chunkMetadata: ChunkMetadata = {
          fileId,
          chunkIndex,
          totalChunks,
          originalName: file.originalname,
          mimetype: file.mimetype,
        };

        // Enviar o chunk para schools-service via NATS

        await lastValueFrom(
          this.cliente.emit('uploadSchoolsCsv', {
            metadata: chunkMetadata,
            data: chunk.toString('base64'), // Envia o chunk como string base64
          }),
        );
      }
      return { message: 'Arquivo enviado com sucesso!', fileId };
    } catch (error) {
      switch (error.message) {
        default:
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
