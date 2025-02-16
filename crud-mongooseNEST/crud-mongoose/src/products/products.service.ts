import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  products: Product[] = [];

  insertProduct(title: string, price: number, description: string) {
    const newProduct = new Product(
      Math.random().toString(),
      title,
      description,
      price,
    );
    console.log(newProduct);

    this.products.push(newProduct);

    return newProduct;
  }

  gt(): Product[] {
    return [...this.products];
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
