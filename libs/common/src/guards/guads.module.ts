import { Module } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";
import { Reflector } from "@nestjs/core";
import { RolesGuard } from "./roles.guard";

@Module({
  imports: [],
  providers: [JwtAuthGuard, LocalAuthGuard, RolesGuard, Reflector],
  exports: [JwtAuthGuard, LocalAuthGuard, RolesGuard, Reflector],
})
export class GuardsModule {}
