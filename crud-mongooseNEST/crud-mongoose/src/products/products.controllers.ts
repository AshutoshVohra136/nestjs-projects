import {
  Delete,
  Post,
  Body,
  Get,
  Patch,
  Controller,
  NotFoundException,
  BadRequestException,
  Res,
  Query,
  Put,
} from '@nestjs/common';

import { Response } from 'express';
// import service

import { ProductService } from './products.service';
import { Product } from './products.model';
import { title } from 'process';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): {}[] {
    return this.productService.getProducts();
  }

  @Post('insertProduct')
  addNewProduct(@Body() body: any) {
    console.log(`controller called`);

    console.log(`Body:`, body);

    const { title, description, price } = body;

    return this.productService.insertProduct(title, description, price);
  }
  @Get('getAllProducts')
  getAllProducts(): Product[] {
    return this.productService.gt();
  }

  @Get('customResponse')
  custom(@Res() res: Response) {
    const rest = this.productService.cust();
    return res.status(200).json({
      data: rest,
      status: 'success',
    });
  }

  @Get('getProductById')
  getProductById(@Query('id') id: string): { status: number; data: Product } {
    console.log(id);

    const product = this.productService.getProductById(id);
    return {
      status: 200,
      data: product,
    };
  }

  @Patch('updateProduct')
  updateProduct(
    @Query('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): { status: string; data: Product } {
    console.log(`updateProduct called`);

    console.log(title);
    console.log(price);
    console.log(description);

    const product = this.productService.updateProduct(id, {
      title: title,
      price: price,
      description: description,
    });
    return { status: 'success', data: product };
  }

  @Delete('deleteProduct')
  deleteProduct(@Query('id') id: string): {
    status: string;
    deletedProduct: Product;
  } {
    const proddel = this.productService.deleteProduct(id);
    return { status: 'success', deletedProduct: proddel };
  }
}
