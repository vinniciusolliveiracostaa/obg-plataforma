import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SchoolsModule } from './schools/schools.module';
import { NatsModule } from './nats/nats.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SchoolsModule, NatsModule],
})
export class AppModule {}
