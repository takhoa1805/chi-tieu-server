import { Injectable } from '@nestjs/common';

// CORE FILE
// A BASIC SERVICE WITH A SINGLE METHOD

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
