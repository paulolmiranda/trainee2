import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import dayjs from 'dayjs';
import { Game } from 'src/game/game.entity';
import { OrderStatusEnum } from './order-status.enum';
import { DayJsTransformer } from 'src/transformers/dayjs.transformer';

@Entity('orders')
export class Order {
  @Column('varchar', {
    name: 'id',
    primary: true,
    nullable: false,
  })
  id: string;

  @Column('varchar', {
    name: 'customer_name',
    length: 150,
    nullable: false,
  })
  customerName: string;

  @Column('varchar', {
    name: 'customer_email',
    length: 50,
    nullable: false,
  })
  customerEmail: string;

  @Column('varchar', {
    name: 'customer_phone',
    length: 11,
    nullable: false,
  })
  customerPhone: string;

  @Column('decimal', {
    name: 'total_price',
    scale: 2,
    precision: 10,
    default: 0,
    nullable: false,
  })
  totalPrice: number;

  @ManyToMany(() => Game, (game) => game.orders)
  @JoinTable({
    name: 'order_games',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'game_id', referencedColumnName: 'id' },
  })
  games: Game[];

  @Column('varchar', {
    name: 'order_status',
    default: OrderStatusEnum.PENDING,
    nullable: false,
  })
  orderStatus: OrderStatusEnum;

  @Column('text', {
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: new DayJsTransformer(),
  })
  createdAt: Date;

  @Column('text', {
    name: 'updated_at',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
    transformer: new DayJsTransformer(),
  })
  updatedAt: Date | null;

  @BeforeInsert()
  updateCreatedAt() {
    this.createdAt = dayjs().toDate();
  }

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updatedAt = dayjs().toDate();
  }
}
