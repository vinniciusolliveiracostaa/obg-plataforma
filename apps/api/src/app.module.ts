import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { GuardsModule, JwtAuthGuard } from '@repo/common/index';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, GuardsModule],
  controllers: [AppController],
  providers: [AppService,
    {provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
