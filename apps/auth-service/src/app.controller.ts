import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BaseUserDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('auth.login')
  async login(@Payload() user: BaseUserDto) {
    return await this.appService.login(user);
  }

  @MessagePattern('auth.validate')
  async validateUser(
    @Payload() payload: { email: string; password: string },
  ): Promise<BaseUserDto> {
    return await this.appService.validateUser(payload.email, payload.password);
  }
}
