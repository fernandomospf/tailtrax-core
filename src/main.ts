import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - TailTrax API')
    .setDescription(
      'Documentação da API do TailTrax, um sistema de gerenciamento de petshop.',
    )
    .setVersion('1.0')
    .addTag('health-check')
    .addTag('products')
    .addTag('services')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.DB_POST || 3000);
  console.log(`Server is running on ${process.env.DB_POST || 3000}...`);
}
bootstrap();
