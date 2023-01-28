import { NestFactory } from '@nestjs/core';
import { ValidationCustomPipe } from '@shared/pipes/validation.custom.pipe';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationCustomPipe());
  await app.listen(3000);
}
bootstrap();
