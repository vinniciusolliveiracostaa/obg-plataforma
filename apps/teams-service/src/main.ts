import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Users-Service Bootstrap');
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const microservice = app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.NATS,
      options: {
        servers: [
          configService.get<string>('NATS_URL', 'nats://localhost:4222'),
        ],
        queue: 'users-service',
        timeout: 5000,
        reconnect: true,
        reconnectTimeWait: 1000,
        maxReconnectAttempts: 10,
        pingInterval: 10000,
      },
    });

    await app.startAllMicroservices();
    logger.log(
      `Microservice is running on ${configService.get<string>('NATS_URL', 'nats://localhost:4222')}`,
    );
  } catch (error) {
    logger.error('Error starting Microservice', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('Fatal error during bootstrap:', error);
  process.exit(1);
});
