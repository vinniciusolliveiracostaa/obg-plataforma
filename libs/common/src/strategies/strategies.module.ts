import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import * as dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(
  __dirname,
  "../../../../services/auth-service/.env"
);
dotenv.config({ path: envPath });

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USERS_CONSUMER",
        transport: Transport.NATS,
        options: {
          servers: ["nats://localhost:4222"],
        },
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "30d" },
    }),  
  ],
  providers: [LocalStrategy, JwtStrategy],
  exports: [LocalStrategy, JwtStrategy, JwtModule],
})
export class StrategiesModule {}
