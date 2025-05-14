import { Module } from '@nestjs/common';
import { SchoolsModule } from './schools/schools.module';
import { UsersModule } from './users/users.module';
import { NatsModule } from './nats/nats.module';

@Module({
  imports: [SchoolsModule, UsersModule, NatsModule],
})
export class AppModule {}
