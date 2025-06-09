import { Inject, Injectable } from "@nestjs/common";

import { Product } from "./product.entity";
import { FileStorageService } from "src/shared/storage/file-storage.service";

@Injectable()
export class ProductRepository {
  constructor(
    @Inject(FileStorageService)
    private readonly storage: FileStorageService<Product>
  ) {}

  public async save(entity: Product): Promise<Product> {
    return this.storage.save(entity);
  }

  public findAll(): Product[] {
    return this.storage.findAll();
  }

  public findOne(id: string): Product {
    return this.storage.findOne(id);
  }

  public async saveAll(products: Product[]): Promise<void> {
    return this.storage.saveAll(products);
  }
}
