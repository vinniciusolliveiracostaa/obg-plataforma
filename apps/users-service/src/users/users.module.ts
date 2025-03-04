import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserRole } from '@repo/entities/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreateSchoolModule } from './schools/school.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole]), UserCreateSchoolModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
