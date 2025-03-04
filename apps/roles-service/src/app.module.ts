import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), DatabaseModule, UserRolesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
