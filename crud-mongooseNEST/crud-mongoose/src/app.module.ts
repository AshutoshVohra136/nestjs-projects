import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';

import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-test106'),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
