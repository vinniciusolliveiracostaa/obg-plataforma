import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { BaseUserDto } from '@obg/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user.created')
  async handleUserCreated(data: BaseUserDto) {
    return await this.appService.handleUserCreated(data);
  }
}
