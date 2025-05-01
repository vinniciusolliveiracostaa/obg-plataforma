import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolsModule } from './schools/schools.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [SchoolsModule, StudentsModule, TeachersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
