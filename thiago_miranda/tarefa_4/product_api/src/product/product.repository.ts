import { Inject, Injectable } from '@nestjs/common';

import { Product } from './product.entity';
import { FileStorageService } from 'src/shared/storage/file-storage.service';

@Injectable()
export class ProductRepository {
  constructor(
    @Inject(FileStorageService)
    private readonly storage: FileStorageService<Product>,
  ) {}

  public async create(productData: Partial<Product>): Promise<Product> {
    if (!productData.name || !productData.brand) {
      throw new Error('Product name, brand are required');
    }
    const product = new Product(productData);
    await this.storage.save(product);
    return product;
  }

  public findAll(): Product[] {
    return this.storage.findAll();
  }

  public findOne(id: string): Product {
    const product = this.storage.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  public async update(
    id: string,
    productData: Partial<Product>,
  ): Promise<Product> {
    const persistense = this.storage.findOne(id);
    if (!persistense) {
      throw new Error('Product not found');
    }

    const updatedProduct = {
      ...persistense,
      ...productData,
      updatedAt: new Date(),
    };

    const allProducts = this.storage.findAll();
    const updatedProducts = allProducts.map((product) =>
      product.id === id ? updatedProduct : product,
    );
    await this.storage.saveAll(updatedProducts);
    return updatedProduct;
  }

  public async delete(id: string): Promise<void> {
    const toDelete = this.storage.findOne(id);
    if (!toDelete) {
      throw new Error('Product does not exist');
    }

    const allProducts = this.storage.findAll();
    const updatedProducts = allProducts.filter((product) => product.id !== id);
    await this.storage.saveAll(updatedProducts);
  }
}
