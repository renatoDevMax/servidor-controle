import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DATABASE_NAME } from './config/database.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);

  console.log(`Servidor rodando na porta ${process.env.PORT ?? 3000}`);
  console.log(`Conectado ao banco de dados ${DATABASE_NAME}`);
}
bootstrap();
