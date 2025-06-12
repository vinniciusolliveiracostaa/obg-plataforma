import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const upperCaseFn = (name: string) => {
  return name.toUpperCase();
};

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        transport: {
          service: config.get<string>('MAIL_SERVICE') || 'gmail',
          auth: {
            user: config.get<string>('MAIL_USER'),
            pass: config.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from:
            config.get<string>('MAIL_FROM') || '"No Reply" <no-reply@obg.com>',
        },
        preview: config.get<string>('NODE_ENV') !== 'production',
        template: {
          dir: config.get<string>('MAIL_TEMPLATE_DIR') || 'templates',
          adapter: new HandlebarsAdapter({ helper_name: upperCaseFn }),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MailerModule],
})
export class NodeMailerModule {}
