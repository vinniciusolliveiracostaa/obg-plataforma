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
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClientNats } from '@nestjs/microservices';
import { CreateSchoolDto, UpdateSchoolDto } from '@repo/dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import * as cuid2 from '@paralleldrive/cuid2';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Escolas')
@Controller('schools')
export class SchoolsController {
  constructor(@Inject('GATEWAY_CONSUMER') private client: ClientNats) {}

  @Post()
  @ApiOperation({ summary: 'Criar Escola', description: 'Cria uma escola' })
  async create(@Body() createSchoolDto: CreateSchoolDto) {
    try {
      return await lastValueFrom(
        this.client.send('createSchool', createSchoolDto),
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
      const data = { page, pageSize };
      return await lastValueFrom(this.client.send('findAllSchools', data));
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
      return await lastValueFrom(this.client.send('findOneSchool', id));
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
  async update(
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    try {
      const payload = { id, updateSchoolDto };
      console.log(payload);
      return await lastValueFrom(this.client.send('updateSchool', payload));
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
  async remove(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.client.send('removeSchool', id));
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
      limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB
      },
    }),
  )
  async uploadFiles(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log('Arquivo recebido:', file.originalname);

    const fileId = cuid2.createId(); // Gera um ID único(cuid) para o arquivo
    const chunkSize = 900; // 900 KB por chunk
    const totalChunks = Math.ceil(file.size / chunkSize);

    // Divide o arquivo em chunks
    const fileBuffer = file.buffer; // O arquivo é recebido como buffer
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = fileBuffer.slice(start, end);

      // Criar metadados do chunk
      const chunkMetadata = {
        fileId,
        chunkIndex,
        totalChunks,
        originalName: file.originalname,
        mimetype: file.mimetype,
      };

      console.log(`Enviando chunk ${chunkIndex + 1} de ${totalChunks}`);

      // Publicar o chunk via NATS
      await lastValueFrom(
        this.client.emit('importSchools', {
          metadata: chunkMetadata,
          data: chunk.toString('base64'),
        }),
      );
    }
    console.log('Upload completo. Todos os chunks foram enviados.');
    return { message: 'Arquivo enviado com sucesso!', fileId };
  }
}
