import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';


@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly repository: Repository<Produto>,
  ) {}

  create(dto: CreateProdutoDto) {
    const produto = this.repository.create(dto);
    return this.repository.save(produto);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const produto = await this.repository.findOneBy ({ id });
    
    if (!produto){
      throw new NotFoundException(`Produto com o id $(id) não encontrado`);
    }

    return produto;
  }

  async update(id: string, dto: UpdateProdutoDto) {
    const produto = await this.repository.findOneBy({ id });
    if(!produto){
      throw new NotFoundException(`Produto com o id $(id) não encontrado`)
    }

    this.repository.merge(produto, dto);
    return this.repository.save(produto);
  
  }

  async remove(id: string) {
    const produto = await this.repository.findOneBy({ id });
    if(!produto) {
      throw new NotFoundException (`Produto com o id $(id) não encontrado!`);
    }

    return this.repository.remove(produto);
  }
}