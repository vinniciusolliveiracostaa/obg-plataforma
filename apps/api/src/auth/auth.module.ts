import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoginValidationMiddleware, StrategiesModule } from '@repo/common/index';

@Module({
  imports: [
    StrategiesModule,
    ClientsModule.register([
          {
            name: 'AUTH_CONSUMER',
            transport: Transport.NATS,
            options: {
              servers: ['nats://localhost:4222'],
            },
          },
        ]),
      ],
  controllers: [AuthController],
  providers: []
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoginValidationMiddleware).forRoutes('auth/login')
  }
}
