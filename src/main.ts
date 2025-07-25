import { AppModule } from './infrastructure/modules/app/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env['PORT'] ?? 3000);
}
bootstrap();
