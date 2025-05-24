import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserSchemaType } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('authLogin')
  async login(@Payload() user: UserSchemaType) {
    try {
      console.log(user);
      return this.appService.login(user);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern('authValidateUser')
  async validateUser(
    @Payload() payload: { email: string; password: string },
  ): Promise<UserSchemaType> {
    try {
      return this.appService.validateUser(payload.email, payload.password);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}