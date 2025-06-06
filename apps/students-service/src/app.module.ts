import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsModule } from './nats/nats.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, NatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
