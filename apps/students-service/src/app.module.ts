import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StudentsModule,
    PrismaModule,
  ],
})
export class AppModule {}
