import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Patch } from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Product {
    return this.productService.findById(id);
  }

  @Post()
  create(@Body() productData: Omit<Product, 'id'>): Product { // esse omit e para sumir o id e deixar so as entidades.
    return this.productService.create(productData);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<Omit<Product, 'id'>>): Product {
    return this.productService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): void {
    this.productService.delete(id);
  }
}
