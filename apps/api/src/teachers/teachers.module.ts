import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEACHERS_SERVICE_GATEWAY_CONSUMER',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [TeachersController],
})
export class TeachersModule {}
