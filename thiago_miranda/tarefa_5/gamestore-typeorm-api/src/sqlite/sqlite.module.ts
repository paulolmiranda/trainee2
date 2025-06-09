import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.resolve(process.cwd(), 'src/sqlite/gamestore.db.sqlite'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class SqliteModule {}
