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

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
  async addNewProduct(@Body() createProductDto: CreateProductDto) {
    console.log(`controller called`);

    console.log(`Body:`, createProductDto);

    const newProduct =
      await this.productService.insertProduct(createProductDto);
    return {
      status: 'success',
      message: 'Product Created Successfully',
      data: newProduct,
    };
  }
  @Get('getAllProducts')
  getAllProducts() {
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
  async getProductById(@Query('id') id: string): Promise<Product> {
    console.log(id);

    const product = await this.productService.getProductById(id);
    return product;
  }

  @Patch('updateProduct')
  async updateProduct(
    @Query('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): Promise<Product> {
    try {
      console.log(`updateProduct called`);

      console.log(title);
      console.log(price);
      console.log(description);

      const product = await this.productService.updateProduct(id, {
        title: title,
        price: price,
        description: description,
      });
      return product;
    } catch (error) {
      throw new NotFoundException('Product Not Found');
    }
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
