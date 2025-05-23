import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ProductRepository } from './product.repository';
import { Product } from './product';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) { }

  create(product: Product): Product {
    product.id = uuidv4();
    this.repository.create(product);
    return product;
  }


  findAll() {
    return this.repository.findAll();
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  update(id: string, product: Product) {
    this.repository.update(id, product);
    return product;
  }

  delete(id: string) {
    this.repository.delete(id);
    return { message: 'Product deleted successfully' };
  }
}
