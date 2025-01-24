import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '@repo/common/index';


@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        migrations: [
            "migrations/*.ts"
        ],
        entities: [Teacher],
        synchronize: Boolean(configService.get('DB_SYNCHRONIZE')),
        logging: Boolean(configService.get('DB_LOGGING')),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
      
    }),
    TypeOrmModule.forFeature([ Teacher ]),
  ],
})
export class DatabaseModule {}