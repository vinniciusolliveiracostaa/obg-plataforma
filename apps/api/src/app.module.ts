import { Module } from '@nestjs/common';
import { TeachersModule } from './teachers/teachers.module';
import { SchoolsModule } from './schools/schools.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [TeachersModule, SchoolsModule, UsersModule, StudentsModule],
})
export class AppModule {}
