import { Request, Controller, HttpCode, HttpException, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { AuthRequest, IsPublic, LocalAuthGuard } from '@repo/common/index';

console.log('teste')

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_CONSUMER') private natsClient: ClientProxy) {}

    

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async signIn(@Request() req: AuthRequest) {
        console.log('Entrando no método signIn'); // teste
        try {
            console.log("User:",req.user)
            const auth = await lastValueFrom(
                
                this.natsClient.send({ cmd:'signIn.auth'}, req.user)
            );
            return auth;

        } catch (error) {
            console.error('Erro no método signIn:', error);
            if (error.message === 'User not found') {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_FOUND,
                        message: 'User not found!',
                        error: error.message,
                    },
                    HttpStatus.NOT_FOUND
                )
            }
        }
    }
}
