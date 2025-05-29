import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [];
  private nextId = 1;

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const prod = this.products.find(p => p.id === id);
    if (!prod) throw new NotFoundException(`Produto ${id} não encontrado`);
    return prod;
  }

  create(data: Omit<Product, 'id'>): Product {
    const product: Product = { id: this.nextId++, ...data };
    this.products.push(product);
    return product;
  }

  update(id: number, data: Partial<Omit<Product, 'id'>>): Product {
    const prod = this.findOne(id);
    Object.assign(prod, data);
    return prod;
  }

  remove(id: number): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundException(`Produto ${id} não encontrado`);
    this.products.splice(index, 1);
  }
}
