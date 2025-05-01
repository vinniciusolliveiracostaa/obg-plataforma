import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TeachersModule } from './teachers/teachers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TeachersModule,
  ],
})
export class AppModule {}
