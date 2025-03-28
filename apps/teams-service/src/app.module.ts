import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TeamsModule,
    DatabaseModule,
  ],
})
export class AppModule {}
