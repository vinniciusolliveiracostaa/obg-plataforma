import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NatsModule } from './nats/nats.module';
import { NodeMailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsModule,
    NodeMailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
