import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SchoolsModule } from './schools/schools.module';
import { TeachersModule } from './teachers/teachers.module';
import { TeamsModule } from './teams/teams.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [UsersModule, SchoolsModule, TeachersModule, TeamsModule, StudentsModule],
})
export class AppModule {}
