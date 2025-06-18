import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NatsConfig } from './config/nats.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('UsersService');

  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const natsConfig = configService.get<NatsConfig>('nats');

    if (!natsConfig) {
      throw new Error('NATS configuration not found');
    }

    const microservice = app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.NATS,
      options: {
        servers: [natsConfig.url],
        queue: natsConfig.queue,
        user: natsConfig.user,
        pass: natsConfig.pass,
        timeout: natsConfig.timeout,
        name: natsConfig.name,
        reconnect: true,
        reconnectTimeWait: 5000,
        maxReconnectAttempts: 10,
        pingInterval: 120000,
      },
    });

    await app.startAllMicroservices();

    logger.log(
      `Microservice ${natsConfig.queue} is running on ${natsConfig.url}`,
    );
  } catch (error) {
    logger.error('Failed to start microservice', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('Fatal error during bootstrap:', error);
  process.exit(1);
});
