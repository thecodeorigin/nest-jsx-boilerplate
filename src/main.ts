import { PORT } from '@common/environments';
import { HttpExceptionsFilter } from '@common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalFilters(new HttpExceptionsFilter())
  
  /* Setup Swagger" */
  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('NestJS Base 2020')
    .setDescription('This is NestJS Simple Base with NestJSX Crud microframework')
    .addBearerAuth()
    .setVersion('1.0')
    .setContact('Thang Do', 'https://github.com/thangdo19', 'dhnthang207@gmail.com')
    .build()
  )
  SwaggerModule.setup('docs', app, document)

  await app.listen(PORT);
}
bootstrap();
