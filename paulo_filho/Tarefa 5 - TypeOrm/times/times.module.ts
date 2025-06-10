import { Module } from '@nestjs/common';
import { TimesController } from './times.controller';
import { TimesService } from './times.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeEntity } from './entity/time.entity';
import { TimeMapper } from './mappers/time.mapper';

@Module({
  imports:[TypeOrmModule.forFeature([TimeEntity])],
  controllers: [TimesController],
  providers: [TimesService,TimeMapper],
  exports:[TimesService, TypeOrmModule]
})
export class TimesModule {}
