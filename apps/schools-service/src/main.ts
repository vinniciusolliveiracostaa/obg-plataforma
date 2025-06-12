import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        queue: 'SCHOOLS_SERVICE',
        servers: ['nats://localhost:4222'],
      },
    },
  );
  await app.listen();
}

bootstrap();
