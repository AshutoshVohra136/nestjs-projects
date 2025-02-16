import { Module } from '@nestjs/common';
import { ProductController } from './products.controllers';
import { ProductService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './products.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
