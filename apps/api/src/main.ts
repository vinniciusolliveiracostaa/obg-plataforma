import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const allowedOrigins = [
  'http://localhost:3000',
  'http://10.0.0.3:3000',
  'http://127.0.0.1:3000',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Express Session descomentado se for necessário manter a sessão do usuário
  // app.use(
  //   session({
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );
  app.enableCors({
    origin: (origin, callback) => {
      // Permitir requisições sem origin (como curl ou extensões)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false, // Se precisar de cookies/autenticação, defina como true
  });
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.API_PORT ?? 8000);
}
bootstrap();
