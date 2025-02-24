import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";




@Module({
    imports: [
        PassportModule,
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
        ClientsModule.register([
            {
              name: 'USERS_CONSUMER',
              transport: Transport.NATS,
              options: {
                servers: ['nats://localhost:4222'],
              },
            },
          ]),
    ],
    providers: [LocalStrategy, JwtStrategy],
    exports: [LocalStrategy, JwtStrategy, JwtModule]
})

export class StrategiesModule {}