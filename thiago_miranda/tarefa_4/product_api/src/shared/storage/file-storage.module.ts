import { DynamicModule, Global, Module } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';

import { BaseEntity } from '../baseEntity';

export interface FileStorageModuleOptions<T extends BaseEntity> {
  filePath: string;
  entityFactory: (data: Partial<T>) => T;
}

@Global()
@Module({})
export class FileStorageModule {
  static forRoot<T extends BaseEntity>(
    options: FileStorageModuleOptions<T>,
  ): DynamicModule {
    return {
      module: FileStorageModule,
      providers: [
        {
          provide: FileStorageService,
          useValue: new FileStorageService(
            options.filePath,
            options.entityFactory,
          ),
        },
      ],
      exports: [FileStorageService],
    };
  }
}
