import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AuthLoginDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('authLogin')
  async login(@Payload() authLoginDto: AuthLoginDto) {
    try {
      return this.appService.login(authLoginDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}