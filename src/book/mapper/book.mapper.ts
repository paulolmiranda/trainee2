import { Book } from '../book.entity';
import { BookResponseDto } from '../dto/book.response.dto';

export class BookMapper {
  static toResponse(book: Book): BookResponseDto {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
    };
  }
}

