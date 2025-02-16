import { Module } from '@nestjs/common';
import { ProductController } from './products.controllers';
import { ProductService } from './products.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
