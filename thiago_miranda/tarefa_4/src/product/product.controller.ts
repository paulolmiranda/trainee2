import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public async create(@Body() product: Product): Promise<Product> {
    try {
      return await this.productService.create(product);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  public getAll(): Product[] {
    return this.productService.getAll();
  }

  @Get(':id')
  public getById(@Param('id') id: string): Product {
    try {
      return this.productService.getById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<Product> {
    try {
      return this.productService.update(id, product);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  public delete(@Param('id') id: string): Promise<void> {
    try {
      return this.productService.delete(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
