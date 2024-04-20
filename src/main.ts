import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

// CORE FILE
// THE ENTRY FILE OF THE APPLICATION WHICH USES THE CORE FUNCTION 'NESTFACTORY' TO CREATE A NEST APPLICATION INSTANCE
// BOOTSTRAP = KHỞI ĐỘNG

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Chi tieu server")
    .setDescription("Server side application provides RESTful APIs for Chi tieu project")
    .setVersion('0.0.1')
    .addTag('speding')
    .build()
  
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);

  await app.listen(3000);
}
bootstrap();
