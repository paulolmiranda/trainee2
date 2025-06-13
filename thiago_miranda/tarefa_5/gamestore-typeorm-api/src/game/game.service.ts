import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Game } from './game.entity';
import { GameDto } from './dto/game.dto';
import { GameRepository } from './game.repository';
import { GameMapper } from 'src/mappers/game.mapper';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { filterUndefined } from 'src/helpers/object.helper';

@Injectable()
export class GameService {
  constructor(
    private readonly mapper: GameMapper,
    private readonly gameRepository: GameRepository,
  ) {}

  public async create(dto: CreateGameDto): Promise<GameDto> {
    const entity = this.mapper.toEntity(dto);
    entity.id = uuid();
    const createdEntity = await this.gameRepository.save(entity);
    return this.mapper.toDto(createdEntity);
  }

  public async update(gameDto: UpdateGameDto): Promise<GameDto> {
    const game = await this.gameRepository.getById(gameDto.id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    const cleanUpdates = filterUndefined(gameDto);
    Object.assign(game, cleanUpdates);
    const updatedEntity = await this.gameRepository.save(game);
    return this.mapper.toDto(updatedEntity);
  }

  public async delete(id: string): Promise<void> {
    const game = await this.getById(id);
    return this.gameRepository.delete(game.id);
  }

  public async getById(id: string): Promise<GameDto> {
    const game = await this.gameRepository.getById(id);

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return this.mapper.toDto(game);
  }

  public async validateGamesList(ids: string[]): Promise<Game[]> {
    if (!ids.length) {
      throw new NotFoundException('At least one game is required');
    }

    const games = await this.gameRepository.getAllByIds(ids);
    const foundGamesIds = new Set(games.map((game) => game.id));
    const missingGamesIds = ids.filter((gameId) => !foundGamesIds.has(gameId));

    if (missingGamesIds.length > 0) {
      throw new NotFoundException(
        `Games not founded with ids: ${missingGamesIds.join(', ')}`,
      );
    }

    return games;
  }

  public async getAll(): Promise<GameDto[]> {
    const games = await this.gameRepository.getAll();
    return this.mapper.toDtos(games);
  }

  public async inactivate(id: string): Promise<void> {
    const game = await this.gameRepository.getById(id);

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    game.isActive = false;
    await this.gameRepository.save(game);
  }

  public async activate(id: string): Promise<void> {
    const game = await this.gameRepository.getById(id);

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    game.isActive = true;
    await this.gameRepository.save(game);
  }
}
