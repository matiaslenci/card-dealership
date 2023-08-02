import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   *  Configuración de Pipe global
   */
  app.useGlobalPipes(
    new ValidationPipe({
      //? Solo recupera los valores que estemos esperando
      whitelist: true,
      //? Devuelve un error si envia propiedades que no esperemos
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
