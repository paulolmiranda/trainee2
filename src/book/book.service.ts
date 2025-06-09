import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
  ) { }

  async create(data: CreateBookDto): Promise<Book> {
    const book = this.repo.create(data);
    return this.repo.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Book> {
    const book = await this.repo.findOneBy({ id });
    if (!book) throw new NotFoundException('Livro não encontrado');
    return book;
  }

  async update(id: number, data: UpdateBookDto): Promise<Book> {
    const book = await this.findById(id);
    return this.repo.save({ ...book, ...data });
  }

  async delete(id: number) {
    await this.findById(id);
    await this.repo.delete(id);
    return { message: 'Livro deletado com sucesso' };
  }
}
