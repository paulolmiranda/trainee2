import { GamePlatformEnum } from '../game-platform.enum';
import { GameGenreEnum } from '../game-genre.enum';

export class CreateGameDto {
  title: string;

  price: number;

  description: string;

  genre: GameGenreEnum;

  publisher: string;

  platform: GamePlatformEnum[];

  release_date: Date;
}
