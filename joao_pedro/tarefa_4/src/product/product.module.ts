import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import Database from 'better-sqlite3';

const db = new Database('products.sqlite');

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    {
      provide: 'DATABASE',
      useValue: db,
    },
  ],
})
export class ProductModule {}
