import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { OrderDto } from './dto/order.dto';
import { GameService } from '../game/game.service';
import { OrderRepository } from './order.repository';
import { OrderStatusEnum } from './order-status.enum';
import { OrderMapper } from 'src/mappers/order.mapper';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderMapper: OrderMapper,
    private readonly gameService: GameService,
    private readonly orderRepository: OrderRepository,
  ) {}

  public async create(dto: CreateOrderDto): Promise<OrderDto> {
    const games = await this.gameService.validateGamesList(dto.gamesIds);
    const order = this.orderMapper.toEntity(dto);
    order.id = uuid();
    order.games = games;
    order.totalPrice = games.reduce((sum, game) => sum + game.price, 0);
    const entity = await this.orderRepository.save(order);

    return this.orderMapper.toDto(entity);
  }

  public async update(dto: UpdateOrderDto): Promise<OrderDto> {
    const data = await this.orderRepository.getById(dto.id);

    if (!data) {
      throw new NotFoundException('Order not found');
    }

    if (data.orderStatus === OrderStatusEnum.COMPLETED) {
      throw new BadRequestException('Completed orders cannot be modified');
    }

    if (data.orderStatus === OrderStatusEnum.CANCELLED) {
      throw new BadRequestException('Cancelled orders cannot be modified');
    }

    Object.assign(data, this.orderMapper.toEntity(dto));

    const games = dto.gamesIds
      ? await this.gameService.validateGamesList(dto.gamesIds)
      : data.games;

    data.games = games;
    data.totalPrice = games.reduce((sum, game) => sum + game.price, 0);
    const entity = await this.orderRepository.save(data);

    return this.orderMapper.toDto(entity);
  }

  public async updateOrderStatus(
    id: string,
    newStatus: OrderStatusEnum,
  ): Promise<OrderDto> {
    const order = await this.orderRepository.getById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.orderStatus === OrderStatusEnum.COMPLETED) {
      throw new BadRequestException('Completed orders cannot be modified');
    }

    if (order.orderStatus === OrderStatusEnum.CANCELLED) {
      throw new BadRequestException('Cancelled orders cannot be modified');
    }

    if (order.orderStatus === OrderStatusEnum.PENDING) {
      if (
        ![OrderStatusEnum.COMPLETED, OrderStatusEnum.CANCELLED].includes(
          newStatus,
        )
      ) {
        throw new BadRequestException(
          `Invalid status transition from ${order.orderStatus} to ${newStatus}`,
        );
      }
    }

    order.orderStatus = newStatus;
    await this.orderRepository.save(order);

    return this.orderMapper.toDto(order);
  }

  public async delete(id: string): Promise<void> {
    const order = await this.getById(id);
    await this.orderRepository.delete(order.id);
  }

  public async getById(id: string): Promise<OrderDto> {
    const order = await this.orderRepository.getById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.orderMapper.toDto(order);
  }

  public async getAll(): Promise<OrderDto[]> {
    const orders = await this.orderRepository.getAll();
    return this.orderMapper.toDtos(orders);
  }
}
