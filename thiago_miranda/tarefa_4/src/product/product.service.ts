import { Injectable } from '@nestjs/common';

import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public create(product: Product): Promise<Product> {
    return this.productRepository.create(product);
  }

  public getAll(): Product[] {
    return this.productRepository.findAll();
  }

  public getById(id: string): Product {
    return this.productRepository.findOne(id);
  }

  public update(id: string, productData: Partial<Product>): Promise<Product> {
    return this.productRepository.update(id, productData);
  }

  public delete(id: string): Promise<void> {
    return this.productRepository.delete(id);
  }
}
