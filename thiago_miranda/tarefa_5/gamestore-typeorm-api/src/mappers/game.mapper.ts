import { Injectable } from '@nestjs/common';

import dayjs from 'dayjs';
import { BaseMapper } from './base.mapper';
import { Game } from 'src/game/game.entity';
import { GameDto } from 'src/game/dto/game.dto';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { UpdateGameDto } from 'src/game/dto/update-game.dto';

@Injectable()
export class GameMapper extends BaseMapper<Game, GameDto> {
  toDto(entity: Game): GameDto {
    const dto = new GameDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.price = entity.price;
    dto.genre = entity.genre;
    dto.platform = entity.platform;
    dto.isActive = entity.isActive;
    dto.publisher = entity.publisher;
    dto.description = entity.description;
    dto.release_date = dayjs(entity.release_date).format('YYYY-MM-DD');
    return dto;
  }

  toEntity(dto: GameDto | CreateGameDto | UpdateGameDto): Game {
    const entity = new Game();
    if ('id' in dto && dto.id) entity.id = dto.id;
    if (dto.title) entity.title = dto.title;
    if (dto.genre) entity.genre = dto.genre;
    if (dto.platform) entity.platform = dto.platform;
    if (dto.publisher) entity.publisher = dto.publisher;
    if (dto.price !== undefined) entity.price = dto.price;
    if (dto.description) entity.description = dto.description;
    if (dto.release_date)
      entity.release_date = dayjs(dto.release_date).toDate();
    return entity;
  }
}
