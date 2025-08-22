import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions:{
        enableImplicitConversion: true,
      }
    })
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const nodeEnv = process.env.ENV;
  if(nodeEnv === "development" || nodeEnv === "dev"){
    const config = new DocumentBuilder()
      .setTitle("Post example")
      .setDescription("The Post api description")
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory, {
      jsonDocumentUrl: 'swagger/json',
    })
  }
  app.use(helmet());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
