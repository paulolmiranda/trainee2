import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';

import dayjs from 'dayjs';
import { Order } from 'src/order/order.entity';
import { GameGenreEnum } from './game-genre.enum';
import { GamePlatformEnum } from './game-platform.enum';
import { DayJsTransformer } from 'src/transformers/dayjs.transformer';

@Entity('games')
export class Game {
  @Column('varchar', {
    name: 'id',
    primary: true,
    nullable: false,
  })
  id: string;

  @Column('varchar', {
    name: 'title',
    length: 150,
    nullable: false,
  })
  title: string;

  @Column('decimal', {
    name: 'price',
    scale: 2,
    precision: 10,
    default: 0,
    nullable: false,
  })
  price: number;

  @Column('varchar', {
    name: 'description',
    length: 650,
    nullable: false,
  })
  description: string;

  @Column('varchar', {
    name: 'publisher',
    length: 150,
    nullable: false,
  })
  publisher: string;

  @Column('varchar', { name: 'genre', nullable: false })
  genre: GameGenreEnum;

  @Column('simple-array', {
    name: 'platform',
    array: true,
    nullable: false,
  })
  platform: GamePlatformEnum[];

  @Column({
    name: 'release_date',
    type: 'date',
    nullable: false,
  })
  release_date: Date;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    nullable: false,
  })
  isActive: boolean;

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

  @ManyToMany(() => Order, (order) => order.games)
  orders: Order[];

  @BeforeInsert()
  updateCreatedAt() {
    this.createdAt = dayjs().toDate();
  }

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updatedAt = dayjs().toDate();
  }
}
