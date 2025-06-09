import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";

import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Get()
  public getAll(): Product[] {
    return this.productService.getAll();
  }

  @Get(":id")
  public getById(@Param("id") id: string): Product {
    return this.productService.getById(id);
  }

  @Put(":id")
  public update(
    @Param("id") id: string,
    @Body() product: Product
  ): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Delete(":id")
  public delete(@Param("id") id: string): Promise<void> {
    return this.productService.delete(id);
  }
}
