import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductService {
  products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct({
    title,
    price,
    description,
  }: {
    title: string;
    price: number;
    description: string;
  }) {
    const newProduct = new this.productModel({
      title: title,
      description: description,
      price: price,
    });
    console.log(newProduct);

    const result = await newProduct.save();

    console.log(`id of new Product is : ${result.id}`);

    console.log(`result`);
    console.log(result);

    return result;
  }

  async gt() {
    const products = await this.productModel.find();

    return products;
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

  getProductById(productId: string): Product {
    const product = this.products.find((prod) => prod.id === productId);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  updateProduct(
    productId: string,
    updateFields: {
      title?: string;
      price?: number;
      description?: string;
    },
  ): Product {
    const product = this.products.find((prod) => prod.id === productId);

    console.log(`updated Fields are:`);

    console.log(updateFields);

    if (!product) throw new NotFoundException('Product Not Found');

    return product;
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
