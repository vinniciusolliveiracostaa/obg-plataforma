import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SchoolsController } from './schools.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SCHOOLS_SERVICE_GATEWAY_CONSUMER',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [SchoolsController],
})
export class SchoolsModule {}
