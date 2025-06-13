import { Injectable } from '@nestjs/common';
import { BaseUserDto } from '@obg/schemas';
import { RpcException } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  async handleUserCreated(data: BaseUserDto) {
    try {
      await this.mailerService.sendMail({
        to: data.email,
        subject: 'Bem-vindo a OBG',
        template: 'welcome',
        context: {
          name: data.name,
          email: data.email,
        },
      });
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw new RpcException(error.message);
    }
  }

  async handlePasswordReset() {}
}
