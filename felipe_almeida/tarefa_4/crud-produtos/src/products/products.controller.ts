import {
  Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private svc: ProductsService) {}

  @Post()
  create(@Body() data: Omit<Product, 'id'>): Product {
    return this.svc.create(data);
  }

  @Get()
  findAll(): Product[] {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Product {
    return this.svc.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Omit<Product, 'id'>>,
  ): Product {
    return this.svc.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.svc.remove(id);
  }
}

