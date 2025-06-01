import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private  repository: Repository<Product>){
}
  async create(dto: CreateProductDto) {
    const product = this.repository.create(dto);
    return await this.repository.save(product);
  }

   async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    const product = await this.repository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não foi encontrado`);
    }

    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
     const product = await this.repository.findOneBy({id});
     if (!product) {
    throw new NotFoundException(`Produto com ID ${id} não foi encontrado`);
  }
     this.repository.merge(product, dto);
     return this.repository.save(product);
  }

  async remove(id: string) {
    const product = await this.repository.findOneBy({id});
     if (!product) {
    throw new NotFoundException(`Produto com ID ${id} não foi encontrado`);
  }
     return this.repository.remove(product);

  }
}
