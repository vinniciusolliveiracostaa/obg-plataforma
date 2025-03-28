import { Module } from '@nestjs/common';
import { SchoolsModule } from './schools/schools.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SchoolsModule,
    DatabaseModule,
  ],
})
export class AppModule {}
