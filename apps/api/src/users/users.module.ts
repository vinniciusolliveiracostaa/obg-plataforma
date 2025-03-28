import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE_GATEWAY_CONSUMER',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
