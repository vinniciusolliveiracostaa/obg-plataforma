import { Module } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SCHOOLS_CONSUMER',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  providers: [SchoolsService],
  exports: [SchoolsService],
})
export class SchoolsModule {}
