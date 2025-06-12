import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsModule } from './nats/nats.module';
import { RedisModule } from './redis/redis.module';
import { JwtModuleModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsModule,
    RedisModule,
    JwtModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
