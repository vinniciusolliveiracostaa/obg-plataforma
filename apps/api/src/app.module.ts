import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SchoolsModule } from './schools/schools.module';
import { NatsModule } from './nats/nats.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SchoolsModule,
    NatsModule,
    AuthModule,
    UsersModule,
    PassportModule,
    TeachersModule,
    StudentsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}