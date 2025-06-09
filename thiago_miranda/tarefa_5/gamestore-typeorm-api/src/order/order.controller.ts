import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { OrderStatusEnum } from './order-status.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public create(@Body() orderDto: CreateOrderDto): Promise<OrderDto> {
    return this.orderService.create(orderDto);
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() orderDto: UpdateOrderDto,
  ): Promise<OrderDto> {
    orderDto.id = id;
    return this.orderService.update(orderDto);
  }

  @Delete(':id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.orderService.delete(id);
  }

  @Get(':id')
  public getById(@Param('id') id: string): Promise<OrderDto> {
    return this.orderService.getById(id);
  }

  @Get()
  public getAll(): Promise<OrderDto[]> {
    return this.orderService.getAll();
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  public updateOrderStatus(
    @Param('id') id: string,
    @Body() { status }: { status: OrderStatusEnum },
  ): Promise<OrderDto> {
    return this.orderService.updateOrderStatus(id, status);
  }
}
