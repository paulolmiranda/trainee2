import { Injectable, OnModuleInit } from "@nestjs/common";
import * as fs from "fs/promises";
import * as path from "path";

import { BaseEntity } from "../baseEntity";

type EntityFactory<T> = (partial: Partial<T>) => T;

@Injectable()
export class FileStorageService<T extends BaseEntity> implements OnModuleInit {
  private data: T[] = [];
  private readonly filePath: string;
  private readonly entityFactory: EntityFactory<T>;

  constructor(filePath: string, entityFactory: EntityFactory<T>) {
    this.filePath = path.join(process.cwd(), filePath);
    this.entityFactory = entityFactory;
  }

  async onModuleInit() {
    await this.loadFromFile();
  }

  private async loadFromFile() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");

      if (!data.trim()) {
        return this.initializeEmptyDb();
      }

      const parseData = JSON.parse(data) as Partial<T>[];
      this.data = parseData.map((item) => this.entityFactory(item));
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        "code" in error &&
        (error as NodeJS.ErrnoException).code === "ENOENT"
      ) {
        return this.initializeEmptyDb();
      }

      throw error;
    }
  }

  private async initializeEmptyDb() {
    this.data = [];
    await this.saveToFile();
  }

  private async saveToFile() {
    const dir = path.dirname(this.filePath);

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      this.filePath,
      JSON.stringify(this.data, null, 2),
      "utf-8"
    );
  }

  public findAll(): T[] {
    return [...this.data];
  }

  public findOne(id: string): T | undefined {
    return this.data.find((item) => item.id === id);
  }

  public async save(item: T): Promise<void> {
    this.data.push(item);
    await this.saveToFile();
  }

  public async saveAll(items: T[]): Promise<void> {
    this.data = [...items];
    await this.saveToFile();
  }
}
