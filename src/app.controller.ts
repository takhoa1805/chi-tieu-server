import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// CORE FILE
// A BASIC CONTROLLER WITH A SINGLE ROUTE

// CONTROLLERS ARE RESPONSIBLE FOR HANDLING INCOMING REQUESTS AND RETURNING RESPONSES TO THE CLIENT

// ROUTING:
// Use the decorator '@CONTROLLER()'
// Specify an optional route path inside. ex: @controller("path")
// => allows us to easily group a set of related routes, and minimize repetitive code
// => 'nest g controller [name]' to create a controller using cli

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
