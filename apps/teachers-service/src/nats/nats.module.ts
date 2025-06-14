import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'TEACHERS_SERVICE_CONSUMER',
        useFactory: async (config: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            url: config.get<string>('NATS_URL') ?? 'nats://localhost:4222',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class NatsModule {}
