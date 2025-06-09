import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { GameDto } from './dto/game.dto';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  public create(@Body() gameDto: CreateGameDto): Promise<GameDto> {
    return this.gameService.create(gameDto);
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() gameDto: UpdateGameDto,
  ): Promise<GameDto> {
    gameDto.id = id;
    return this.gameService.update(gameDto);
  }

  @Delete(':id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.gameService.delete(id);
  }

  @Get(':id')
  public getById(@Param('id') id: string): Promise<GameDto> {
    return this.gameService.getById(id);
  }

  @Get()
  public getAll(): Promise<GameDto[]> {
    return this.gameService.getAll();
  }

  @Patch(':id/inactive')
  public inactivate(@Param('id') id: string): Promise<void> {
    return this.gameService.inactivate(id);
  }

  @Patch(':id/active')
  public activate(@Param('id') id: string): Promise<void> {
    return this.gameService.activate(id);
  }
}
