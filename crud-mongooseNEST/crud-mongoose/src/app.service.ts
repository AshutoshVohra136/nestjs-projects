import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  sayBye(): { name: string; age: number } {
    return { name: 'Apple', age: 24 };
  }
}
