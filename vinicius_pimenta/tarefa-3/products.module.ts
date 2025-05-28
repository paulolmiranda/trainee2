import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
