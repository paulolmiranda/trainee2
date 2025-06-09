import { GameGenreEnum } from '../game-genre.enum';
import { GamePlatformEnum } from '../game-platform.enum';

export class UpdateGameDto {
  id: string;

  title?: string;

  price?: number;

  description?: string;

  genre?: GameGenreEnum;

  publisher?: string;

  platform?: GamePlatformEnum[];

  release_date?: Date;
}
