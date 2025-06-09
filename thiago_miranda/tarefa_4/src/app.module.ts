import { Module } from "@nestjs/common";

import { Product, ProductModule } from "./product";
import { FileStorageModule } from "./shared/storage/file-storage.module";

@Module({
  imports: [
    FileStorageModule.forRoot({
      filePath: "src/shared/storage/products-db.json",
      entityFactory: (data: Partial<Product>) => new Product(data),
    }),

    ProductModule,
  ],
})
export class AppModule {}
