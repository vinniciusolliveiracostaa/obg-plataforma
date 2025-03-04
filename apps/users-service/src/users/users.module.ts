import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '@repo/entities/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreateSchoolModule } from './schools/school.module';
import { CreateUserRoleModule } from './userRole/UserRole.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CreateUserRoleModule, UserCreateSchoolModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
