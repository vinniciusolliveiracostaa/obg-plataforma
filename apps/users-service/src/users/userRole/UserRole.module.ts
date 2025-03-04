import { Module } from "@nestjs/common";
import { CreateUserRoleService } from "./userRole.service";
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
    imports: [
        ClientsModule.register([
          {
            name: 'ROLES_CONSUMER',
            transport: Transport.NATS,
            options: {
              servers: ['nats://localhost:4222'],
            },
          },
        ]),
      ],
    providers: [CreateUserRoleService],
    exports: [CreateUserRoleService],
})
export class CreateUserRoleModule {}