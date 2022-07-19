import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3009;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.debug(`App running on port ${port}`, 'DEBUG');
}
bootstrap();
