import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const allowedOrigins = [
  'http://localhost:3000',
  'http://10.0.0.3:3000',
  'http://127.0.0.1:3000',
];

async function bootstrap() {
  const logger = new Logger('API Gateway');

  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors({
      origin: (origin, callback) => {
        // Permitir requisições sem origin (como curl ou extensões)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          return callback(new Error('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: false, // Se precisar de cookies/autenticação, defina como true
    });

    const config = new DocumentBuilder()
      .setTitle('API Gateway')
      .setDescription('API Gateway Documentation')
      .setVersion('1.0')
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    const port = configService.get<number>('API_PORT') || 8000;

    await app.listen(port);
    logger.log(`API Gateway is running on port ${port}`);
  } catch (error) {
    logger.error('Failed to start API GATEWAY', error);
    process.exit(1);
  }
}

bootstrap().catch((err) => {
  console.error('Fatal error during bootstrap:', err);
  process.exit(1);
});
