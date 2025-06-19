import { Body, Controller, Get, Post, Request, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '@obg/pipes';
import {
  BaseUserDto,
  CreateAllUsersDto,
  CreateAllUsersSchema,
} from '@obg/schemas';
import { AuthRequest } from '@obg/interfaces';
import { CurrentUser } from '@obg/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(CreateAllUsersSchema))
  async register(@Body() data: CreateAllUsersDto) {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(@Request() req: AuthRequest) {
    return await this.authService.login(req);
  }

  @Post('refresh')
  async refresh() {}

  @Post('forgot-password')
  async forgotPassword() {}

  @Post('reset-password')
  async resetPassword() {}

  @Post('logout')
  async logout() {}

  @Get('me')
  async me(@CurrentUser() currentUser: BaseUserDto): Promise<BaseUserDto> {
    return await this.authService.me(currentUser);
  }
}
