import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEAMS_SERVICE_GATEWAY_CONSUMER',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [TeamsController],
})
export class TeamsModule {}
