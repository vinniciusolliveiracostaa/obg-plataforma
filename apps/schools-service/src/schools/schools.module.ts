import { Module } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { SchoolsCsvService } from './schools-csv.service';

@Module({
  controllers: [SchoolsController],
  providers: [SchoolsService, SchoolsCsvService],
})
export class SchoolsModule {}
