import { Injectable } from '@nestjs/common';
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

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateProdutoDto) {
    const produto = await this.repository.findOneBy({ id });
    if(!produto) return null;
    this.repository.merge(produto, dto);
    return this.repository.save(produto);
  
  }

  async remove(id: string) {
    const produto = await this.repository.findOneBy({ id });
    if(!produto) return null;
    return this.repository.remove(produto);
  }
}
 