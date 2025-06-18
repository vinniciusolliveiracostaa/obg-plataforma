import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { natsConfig, natsConfigValidationSchema } from './config/configuration';
import { NatsModule } from './nats/nats.module';
import { UsersModule } from './users/users.module';
import { SchoolsModule } from './schools/schools.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [natsConfig],
      validationSchema: natsConfigValidationSchema,
      validationOptions: { abortEarly: true },
    }),
    AuthModule,
    NatsModule,
    UsersModule,
    SchoolsModule,
    StudentsModule,
    TeachersModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
