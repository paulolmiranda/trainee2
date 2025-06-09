import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';
import { BookMapper } from './mapper/book.mapper';

@Controller('books')
export class BookController {
  constructor(private readonly service: BookService) { }

  @Post()
  async create(@Body() dto: CreateBookDto) {
    const book = await this.service.create(dto);
    return BookMapper.toResponse(book);
  }

  @Get()
  async findAll() {
    const books = await this.service.findAll();
    return books.map(BookMapper.toResponse);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const book = await this.service.findById(Number(id));
    return BookMapper.toResponse(book);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    const book = await this.service.update(Number(id), dto);
    return BookMapper.toResponse(book);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
} 
