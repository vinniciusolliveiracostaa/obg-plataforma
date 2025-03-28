import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TeachersModule,
    DatabaseModule,
  ],
})
export class AppModule {}
