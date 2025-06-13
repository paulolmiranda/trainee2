import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Order } from './order.entity';

@Injectable()
export class OrderRepository {
  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  private getOrderQueryBuilder(): SelectQueryBuilder<Order> {
    return this.repository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.games', 'game');
  }

  public async save(entity: Order): Promise<Order> {
    return this.repository.save(entity);
  }

  public async getById(id: string): Promise<Order | null> {
    return this.getOrderQueryBuilder().where('order.id = :id', { id }).getOne();
  }

  public async getAll(): Promise<Order[]> {
    return this.getOrderQueryBuilder().getMany();
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}
