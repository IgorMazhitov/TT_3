import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const appPort = process.env.PORT || 3300;
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(appPort, () => {
    console.log('Server started on http://localhost:' + appPort + '/api');
  });
}
bootstrap();
