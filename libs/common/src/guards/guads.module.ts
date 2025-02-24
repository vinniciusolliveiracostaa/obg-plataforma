import { Module } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";
import { Reflector } from "@nestjs/core";

@Module({
  imports: [],
  providers: [JwtAuthGuard, LocalAuthGuard, Reflector],
  exports: [JwtAuthGuard, LocalAuthGuard, Reflector],
})
export class GuardsModule {}
