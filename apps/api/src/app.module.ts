import { Module } from '@nestjs/common';
import { SchoolsModule } from './schools/schools.module';

@Module({
  imports: [SchoolsModule],
})
export class AppModule {}
