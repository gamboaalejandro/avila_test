import * as dotenv from 'dotenv';
dotenv.config({path: `./deploy/.env.${process.env.NODE_ENV}`});
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from 'docs/swagger.docs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt/jwt.auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    whitelist: true,
  }));
  app.enableCors();

  swagger(app);
  await app.listen(3000);
}
bootstrap();