import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Team } from '@repo/entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
