import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TeachersModule } from './teachers/teachers.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, TeachersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
