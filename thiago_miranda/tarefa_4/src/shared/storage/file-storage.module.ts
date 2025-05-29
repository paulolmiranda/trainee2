import { DynamicModule, Global, Module } from '@nestjs/common';

import { BaseEntity } from '../baseEntity';
import { FileStorageService } from './file-storage.service';

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
