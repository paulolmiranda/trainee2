import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  private repository = new ProductRepository();

  findAll(): Product[] {
    return this.repository.findAll(); // aqui ele retorna tudo que foi especificado no repositorio.
  }

  findById(id: number): Product {
    const product = this.repository.findById(id);
    if (!product) throw new NotFoundException(`Produto com id ${id} não foi encontrado`);
    return product; // ja fiz a validação de erros
  }

  create(productData: Omit<Product, 'id'>): Product {
    return this.repository.create(productData);
  }

  update(id: number, updateData: Partial<Omit<Product, 'id'>>): Product {
    const product = this.repository.update(id, updateData);
    if (!product) throw new NotFoundException(`Produto com id ${id} não encontrado`);
    return product;// aqui tambem a validação de erros
  }

  delete(id: number): void {
    const deleted = this.repository.delete(id);
    if (!deleted) throw new NotFoundException(`Produto com id ${id} não encontrado`);
  }
}
