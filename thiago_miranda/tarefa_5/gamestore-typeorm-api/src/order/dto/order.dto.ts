import { OrderStatusEnum } from '../order-status.enum';

export class OrderDto {
  id: string;

  customerName: string;

  customerEmail: string;

  customerPhone: string;

  gamesIds: string[];

  orderStatus: OrderStatusEnum;

  totalPrice: number;
}
