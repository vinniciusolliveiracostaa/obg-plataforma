import { Module } from '@nestjs/common';
import { UserCreateSchoolService } from './school.service';
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
  providers: [UserCreateSchoolService],
  exports: [UserCreateSchoolService],
})
export class UserCreateSchoolModule {}
