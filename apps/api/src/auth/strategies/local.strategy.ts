import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(@Inject('API_GATEWAY_CONSUMER') private client: ClientProxy) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    console.log('🔐 Validando usuário', { email, password });
    const payload = { email, password };
    try {
      const user = await firstValueFrom(
        this.client.send('auth.validate', payload),
      );

      console.log('🧍 Resultado da validação:', user);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return user; // Este user será automaticamente anexado ao req.user
    } catch (error) {
      console.error('❌ Erro ao validar usuário:', error);
      throw new UnauthorizedException(error.message);
    }
  }
}
