import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StrategiesModule } from '@repo/common/index';


@Module({
  imports: [
    StrategiesModule,
    ClientsModule.register([
          {
            name: 'USERS_CONSUMER',
            transport: Transport.NATS,
            options: {
              servers: ['nats://localhost:4222'],
            },
          },
        ]),
      ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
