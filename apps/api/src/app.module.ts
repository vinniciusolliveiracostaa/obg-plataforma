import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SchoolsModule } from './schools/schools.module';
import { NatsModule } from './nats/nats.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SchoolsModule,
    NatsModule,
    AuthModule,
    UsersModule,
    PassportModule,
  ],
})
export class AppModule {}