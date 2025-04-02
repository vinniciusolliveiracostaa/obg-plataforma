import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SchoolsModule } from './schools/schools.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, SchoolsModule],
})
export class AppModule {}
