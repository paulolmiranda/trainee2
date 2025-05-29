import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private repo: ProductsRepository) {}

  create(data: Omit<Product, 'id'>): Product {
    return this.repo.create(data);
  }

  findAll(): Product[] {
    return this.repo.findAll();
  }

  findOne(id: number): Product {
    return this.repo.findOne(id);
  }

  update(id: number, data: Partial<Omit<Product, 'id'>>): Product {
    return this.repo.update(id, data);
  }

  remove(id: number): void {
    return this.repo.remove(id);
  }
}

