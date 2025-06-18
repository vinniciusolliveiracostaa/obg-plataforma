import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsModule } from './nats/nats.module';
import { ConfigModule } from '@nestjs/config';
import { natsConfig, natsConfigValidationSchema } from './config/configuration';
import { JwtModuleModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [natsConfig],
      validationSchema: natsConfigValidationSchema,
      validationOptions: { abortEarly: true },
    }),
    NatsModule,
    JwtModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
