import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
@Injectable()
export class ProductService {
  products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      console.log(newProduct);

      const result = await newProduct.save();

      console.log(`id of new Product is : ${result.id}`);

      console.log(`result`);
      console.log(result);

      return result;
    } catch (error) {
      throw new NotFoundException('product insertion failed');
    }
  }

  async gt() {
    try {
      const products = await this.productModel.find();

      return products;
    } catch (error) {
      throw new NotFoundException('products not found');
    }
  }

  cust(): string {
    return 'pikachu';
  }

  getProducts(): { data: string; id: string }[] {
    return [
      { data: 'Laptop', id: '1' },
      { data: 'Smartphone', id: '2' },
      { data: 'Headphones', id: '3' },
      { data: 'Smartwatch', id: '4' },
      { data: 'Tablet', id: '5' },
    ];
  }

  async getProductById(productId: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(productId);
      if (!product) {
        throw new NotFoundException('product not found');
      }

      return product;
    } catch (error) {
      throw new NotFoundException('product not found');
    }
  }

  async updateProduct(
    productId: string,
    updateFields: {
      title?: string;
      price?: number;
      description?: string;
    },
  ): Promise<Product> {
    try {
      const product = await this.productModel.findByIdAndUpdate(
        productId,
        updateFields,
      );

      console.log(`updated Fields are:`);

      console.log(updateFields);

      if (!product) throw new NotFoundException('Product Not Found');

      return product;
    } catch (error) {
      throw new NotFoundException('Product Not Found');
    }
  }

  deleteProduct(productId: string): Product {
    // find product

    const product = this.products.find((prod) => {
      prod.id === productId;
    });

    if (!product) throw new NotFoundException('Product Not Found');
    return product;
  }
}
