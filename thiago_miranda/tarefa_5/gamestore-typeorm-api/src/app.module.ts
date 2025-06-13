import { Module } from '@nestjs/common';

import { GameModule } from './game/game.module';
import { OrderModule } from './order/order.module';
import { SqliteModule } from './sqlite/sqlite.module';

@Module({
  imports: [GameModule, OrderModule, SqliteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
