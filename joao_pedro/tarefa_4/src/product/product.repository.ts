import { Inject, Injectable } from '@nestjs/common';
import type Database from 'better-sqlite3';
import { Product } from './product';

@Injectable()
export class ProductRepository {
  constructor(@Inject('DATABASE') private db: Database) {
    this.db
      .prepare(`
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          brand TEXT NOT NULL
        )
      `)
      .run();
  }

  create(product: Product): void {
    this.db
      .prepare('INSERT INTO products (id, name, brand) VALUES (?, ?, ?)')
      .run(product.id, product.name, product.brand);
  }

  findAll(): Product[] {
    return this.db.prepare('SELECT * FROM products').all();
  }

  findById(id: string): Product {
    return this.db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  }

  update(id: string, product: Product): void {
    this.db
      .prepare('UPDATE products SET name = ?, brand = ? WHERE id = ?')
      .run(product.name, product.brand, id);
  }

  delete(id: string): void {
    this.db.prepare('DELETE FROM products WHERE id = ?').run(id);
  }
}