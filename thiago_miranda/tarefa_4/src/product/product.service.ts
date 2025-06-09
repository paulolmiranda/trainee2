import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from "@nestjs/common";

import { Product } from "./product.entity";
import { ProductRepository } from "./product.repository";

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async create(entityData: Partial<Product>): Promise<Product> {
    if (!entityData.name || !entityData.brand) {
      throw new BadRequestException("Product name, brand are required");
    }
    const product = new Product(entityData);
    return this.productRepository.save(product);
  }

  public async getAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  public async getById(id: string): Promise<Product> {
    const product = this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return product;
  }

  public async update(
    id: string,
    entityData: Partial<Product>
  ): Promise<Product> {
    const product = await this.getById(id);
    const updatedProduct = {
      ...product,
      ...entityData,
      updatedAt: new Date(),
    };
    const allProducts = this.productRepository.findAll();
    const updatedProducts = allProducts.map((product) =>
      product.id === id ? updatedProduct : product
    );
    await this.productRepository.saveAll(updatedProducts);
    return updatedProduct;
  }

  public async delete(id: string): Promise<void> {
    const product = await this.getById(id);
    const allProducts = this.productRepository.findAll();
    const updatedProducts = allProducts.filter((product) => product.id !== id);
    return this.productRepository.saveAll(updatedProducts);
  }
}
