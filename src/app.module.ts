import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

import { TransactionsModule } from './transactions/transactions.module';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';

import { WalletsModule } from './wallets/wallets.module';
import { WalletsController } from './wallets/wallets.controller';
import { WalletsService } from './wallets/wallets.service';

import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

// MONGO DB
import {MongooseModule} from '@nestjs/mongoose';

// CORE FILE
// THE ROOT MODULE OF THE APPLICATION

@Module({
  // imports: [UsersModule, WalletsModule,MongooseModule.forRoot('mongodb+srv://takhoa:takhoa@chi-tieu-database.q7ezyqp.mongodb.net/')],
  // controllers: [AppController, UsersController, WalletsController],
  // providers: [AppService, UsersService, WalletsService],
  imports:[],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
