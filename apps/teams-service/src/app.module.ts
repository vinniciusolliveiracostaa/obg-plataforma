import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TeamsModule } from './teams/teams.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TeamsModule,
  ],
})
export class AppModule {}
