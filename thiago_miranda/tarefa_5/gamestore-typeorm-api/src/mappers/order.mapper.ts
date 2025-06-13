import { Injectable } from '@nestjs/common';

import { BaseMapper } from './base.mapper';
import { Order } from 'src/order/order.entity';
import { OrderDto } from 'src/order/dto/order.dto';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';

@Injectable()
export class OrderMapper extends BaseMapper<Order, OrderDto> {
  toDto(entity: Order): OrderDto {
    const dto = new OrderDto();
    dto.id = entity.id;
    dto.customerName = entity.customerName;
    dto.customerEmail = entity.customerEmail;
    dto.customerPhone = entity.customerPhone;
    dto.gamesIds = entity.games?.map((game) => game.id) || [];
    dto.totalPrice = entity.totalPrice;
    dto.orderStatus = entity.orderStatus;
    return dto;
  }

  toEntity(dto: OrderDto | CreateOrderDto | UpdateOrderDto): Order {
    const entity = new Order();
    if ('id' in dto && dto.id) entity.id = dto.id;
    if (dto.customerName) entity.customerName = dto.customerName;
    if (dto.customerEmail) entity.customerEmail = dto.customerEmail;
    if (dto.customerPhone) entity.customerPhone = dto.customerPhone;
    if ('orderStatus' in dto) entity.orderStatus = dto.orderStatus;
    return entity;
  }
}
