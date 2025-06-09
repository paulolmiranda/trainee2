import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Game } from './game.entity';

@Injectable()
export class GameRepository {
  @InjectRepository(Game)
  private readonly repository: Repository<Game>;

  public async save(entity: Game): Promise<Game> {
    return this.repository.save(entity);
  }

  public async getAllByIds(ids: string[]): Promise<Game[]> {
    return this.repository
      .createQueryBuilder('game')
      .where('game.id IN (:...ids)', { ids })
      .getMany();
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  public async getById(id: string): Promise<Game | null> {
    return this.repository.findOneBy({ id });
  }

  public async getAll(): Promise<Game[]> {
    return this.repository.find();
  }
}
