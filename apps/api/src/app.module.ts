import { Module } from '@nestjs/common';
import { SchoolsModule } from './schools/schools.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [SchoolsModule, StudentsModule, TeachersModule, TeamsModule],
})
export class AppModule {}
