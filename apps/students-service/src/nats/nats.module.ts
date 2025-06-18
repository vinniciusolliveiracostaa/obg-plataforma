import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        useFactory: async (config: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [config.getOrThrow<string>('NATS_URL')],
            queue: config.getOrThrow<string>('NATS_QUEUE'),
            name: config.getOrThrow<string>('NATS_NAME'),
            timeout: config.getOrThrow<number>('NATS_TIMEOUT'),
            reconnect: true,
            reconnectTimeWait: 5000,
            maxReconnectAttempts: 10,
            pingInterval: 120000,
          },
        }),
        inject: [ConfigService],
        name: 'STUDENTS_SERVICE_CONSUMER', // Nome fixo para injeção de dependência
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class NatsModule {}
