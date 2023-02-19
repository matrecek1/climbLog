import { Injectable } from '@nestjs/common';
import { getBoulders } from './database/boulder';

@Injectable()
export class AppService {
   getHello(): string {
    return 'Hello World!';
  }
}
