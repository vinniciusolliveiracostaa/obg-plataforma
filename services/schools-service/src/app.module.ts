import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SchoolsModule } from './schools/schools.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, SchoolsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
