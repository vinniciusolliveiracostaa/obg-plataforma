import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NatsModule } from './nats/nats.module';
import { NodeMailerModule } from './mailer/mailer.module';
import { natsConfig, natsConfigValidationSchema } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [natsConfig],
      validationSchema: natsConfigValidationSchema,
      validationOptions: { abortEarly: true },
    }),
    NatsModule,
    NodeMailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
