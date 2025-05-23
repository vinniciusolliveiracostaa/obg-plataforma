import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SchoolsModule } from './schools/schools.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (config: ConfigService) => {
        const redisUrl =
          config.get<string>('REDIS_URL') ?? 'redis://:6548@localhost:6379/0';

        return {
          ttl: 60_000,
          store: redisStore,
          url: redisUrl,
        };
      },
    }),
    PrismaModule,
    SchoolsModule,
  ],
})
export class AppModule {}
