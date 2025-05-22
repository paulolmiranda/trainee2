// src/produtos/produtos.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Produto } from './entities/produto.entity'; // Certifique-se que o caminho está correto
import { CreateProdutoDto } from './dto/create-produto.dto'; // Corrigido o caminho aqui!

@Injectable()
export class ProdutosService {
  private produtos: Produto[] = [];
  private idCounter: number = 1;

  create(dto: CreateProdutoDto): Produto {
    const novoProduto: Produto = {
      id: this.idCounter++,
      nome: dto.nome, // Adicionei explicitamente nome e marca
      marca: dto.marca, // para clareza, mas ...dto também funciona se o DTO tiver só isso
    };
    this.produtos.push(novoProduto);
    return novoProduto;
  }

  findAll(): Produto[] {
    return this.produtos;
  }

  findOne(id: number): Produto | undefined { // Retorno pode ser undefined
    return this.produtos.find(p => p.id === id);
  }

  update(id: number, dto: CreateProdutoDto): Produto { // Considere UpdateProdutoDto
    const index = this.produtos.findIndex(p => p.id === id);
    if (index === -1) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    const produtoAtualizado: Produto = {
        ...this.produtos[index], // Copia o existente
        ...dto, // Sobrescreve com o DTO
        id: this.produtos[index].id // Mantém o ID original
    };
    this.produtos[index] = produtoAtualizado;
    return produtoAtualizado;
  }

  remove(id: number): void {
    const initialLength = this.produtos.length;
    this.produtos = this.produtos.filter(p => p.id !== id);
    if (this.produtos.length === initialLength) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado para exclusão.`);
    }
  }
}