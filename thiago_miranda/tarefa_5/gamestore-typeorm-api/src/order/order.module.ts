import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Order } from './order.entity';
import { OrderService } from './order.service';
import { GameModule } from 'src/game/game.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderMapper } from '../mappers/order.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), GameModule],
  providers: [OrderService, OrderRepository, OrderMapper],
  controllers: [OrderController],
})
export class OrderModule {}
