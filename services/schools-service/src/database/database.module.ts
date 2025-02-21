import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from '@repo/common/index';


@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_DB'),
        migrations: [
            "migrations/*.ts"
        ],
        entities: [School],
        synchronize: Boolean(configService.get('DB_SYNC')),
        logging: Boolean(configService.get('DB_LOGG')),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
      
    }),
    TypeOrmModule.forFeature([School]),
  ],
})
export class DatabaseModule {}