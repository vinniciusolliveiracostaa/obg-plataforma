import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SchoolsModule } from './schools/schools.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SchoolsModule, PrismaModule],
})
export class AppModule {}
