import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Game } from './game.entity';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { GameMapper } from '../mappers/game.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GameService, GameRepository, GameMapper],
  exports: [GameService, GameRepository, GameMapper],
  controllers: [GameController],
})
export class GameModule {}
