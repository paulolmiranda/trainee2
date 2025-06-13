import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

import { GamePlatformEnum } from '../game-platform.enum';
import { GameGenreEnum } from '../game-genre.enum';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(650)
  description: string;

  @IsNotEmpty()
  @IsEnum(GameGenreEnum)
  genre: GameGenreEnum;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  publisher: string;

  @IsArray()
  @IsNotEmpty()
  @IsEnum(GamePlatformEnum, { each: true })
  platform: GamePlatformEnum[];

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  release_date: Date;
}
