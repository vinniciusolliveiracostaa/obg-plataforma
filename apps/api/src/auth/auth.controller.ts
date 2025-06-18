import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CurrentUSer, IsPublic } from '@obg/decorators';
import { AuthRequest } from '@obg/interfaces';

import { BaseUserDto } from '@obg/schemas';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Realiza o login do usuário',
  })
  async login(@Request() req: AuthRequest) {
    return await this.authService.login(req);
  }

  @IsPublic()
  @Get('/profile')
  async profile(@CurrentUSer() currentUser: BaseUserDto): Promise<BaseUserDto> {
    return await this.authService.profile(currentUser);
  }
}
