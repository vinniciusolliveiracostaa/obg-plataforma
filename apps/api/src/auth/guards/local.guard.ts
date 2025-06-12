import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    console.log('➡️ LocalAuthGuard canActivate chamado');
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    //await super.logIn(request); // descomentar se for necessário manter a sessão do usuário, use o express-session
    console.log('✅ Request.body:', request.body);
    return result;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('INVALID_CREDENTIALS');
    }
    return user;
  }
}
