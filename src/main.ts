import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions:{
      enableImplicitConversion: true // 자동으로 IsNumer같은걸 확인하고 변환까지 해줌
    }
  }));
  await app.listen(3000);
}
bootstrap();
