import { Module } from '@nestjs/common';
import { TeachersModule } from './teachers/teachers.module';
import { SchoolsModule } from './schools/schools.module';

@Module({
  imports: [TeachersModule, SchoolsModule],
})
export class AppModule {}
