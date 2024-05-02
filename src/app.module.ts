import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// MONGO DB
import { MongooseModule } from '@nestjs/mongoose';

// CONTROLLERS
import { UsersController } from './users/users.controller';

// CORE FILE
// THE ROOT MODULE OF THE APPLICATION

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
