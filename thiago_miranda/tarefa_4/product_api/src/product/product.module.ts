import { Module } from '@nestjs/common';

import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controller';
import { FileStorageModule } from 'src/shared/storage/file-storage.module';

@Module({
  imports: [
    FileStorageModule.forRoot<Product>({
      filePath: 'src/shared/storage/products-db.json',
      entityFactory: (data: Partial<Product>) => new Product(data),
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
