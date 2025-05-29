import { BaseEntity } from 'src/shared';

export class Product extends BaseEntity {
  name: string;
  brand: string;
  sku: number;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(partial: Partial<Product> = {}) {
    super(partial);
    this.name = partial.name || '';
    this.brand = partial.brand || '';
    this.sku = partial.sku || 0;
    this.createdAt = partial.createdAt || new Date();
    this.updatedAt = partial.updatedAt || null;
  }
}
