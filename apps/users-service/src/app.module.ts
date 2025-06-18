import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { NatsModule } from './nats/nats.module';
import { natsConfig, natsConfigValidationSchema } from './config/configuration';
import { RedisModule } from './redis/redis.module';
import { UserIntegrityService } from './user-integrity.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [natsConfig],
      validationSchema: natsConfigValidationSchema,
      validationOptions: { abortEarly: true },
    }),
    NatsModule,
    RedisModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserIntegrityService],
})
export class AppModule {}
