import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { TeamsModule } from './teams/teams.module';
import { SchoolsModule } from './schools/schools.module';
import { EditionsModule } from './editions/editions.module';
import { QuestionsModule } from './questions/questions.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ExamsModule } from './exams/exams.module';
import { AnswersModule } from './answers/answers.module';
import { ResultsModule } from './results/results.module';
import { CertificatesModule } from './certificates/certificates.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AppealsModule } from './appeals/appeals.module';
import { PaymentsModule } from './payments/payments.module';
import { PhasesModule } from './phases/phases.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    StudentsModule,
    TeachersModule,
    TeamsModule,
    SchoolsModule,
    EditionsModule,
    QuestionsModule,
    ReviewsModule,
    ExamsModule,
    AnswersModule,
    ResultsModule,
    CertificatesModule,
    NotificationsModule,
    AppealsModule,
    PaymentsModule,
    PhasesModule,
    RegistrationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
