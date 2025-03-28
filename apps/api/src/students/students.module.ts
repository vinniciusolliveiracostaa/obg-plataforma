import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STUDENTS_SERVICE_GATEWAY_CONSUMER',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [StudentsController],
})
export class StudentsModule {}
