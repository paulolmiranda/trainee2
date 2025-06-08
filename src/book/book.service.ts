import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
  ) { }

  create(data: Partial<Book>) {
    const book = this.repo.create(data);
    return this.repo.save(book);
  }

  findAll() {
    return this.repo.find();
  }

  async findById(id: number) {
    const book = await this.repo.findOneBy({ id });
    if (!book) throw new NotFoundException('Livro não encontrado');
    return book;
  }

  async update(id: number, data: Partial<Book>) {
    const book = await this.findById(id);
    return this.repo.save({ ...book, ...data });
  }

  async delete(id: number) {
    const book = await this.findById(id);
    await this.repo.delete(id);
    return { message: 'Livro deletado com sucesso' };
  }
}
