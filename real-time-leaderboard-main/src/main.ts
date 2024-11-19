import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { SocketIoAdapter } from './socket/socket.adapter';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  // set logs dir
  if (!existsSync('./logs')) mkdirSync('./logs');

  const app = await NestFactory.create<
    INestApplication<NestExpressApplication>
  >(AppModule, {
    rawBody: true,
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const adapter = new SocketIoAdapter(app, app.get(JwtService));
  app.useWebSocketAdapter(adapter);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
