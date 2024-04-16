import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// CORE FILE
// THE ENTRY FILE OF THE APPLICATION WHICH USES THE CORE FUNCTION 'NESTFACTORY' TO CREATE A NEST APPLICATION INSTANCE
// BOOTSTRAP = KHỞI ĐỘNG

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
