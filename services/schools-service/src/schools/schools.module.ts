import { Module } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from '@repo/common/index';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([School])],
  providers: [SchoolsService],
  exports: [SchoolsService],
})
export class SchoolsModule {}
