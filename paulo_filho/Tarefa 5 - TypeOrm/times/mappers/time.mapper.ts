import { Injectable } from '@nestjs/common';
import { TimeEntity } from '../entity/time.entity';
import { CreateTimeDto } from '../dto/create-time-dto';
import { UpdatePutTimeDto } from '../dto/update-time-dto';
import { TimeResponseDto } from '../dto/time-response-dto';

import { BaseMapper } from './base.mapper';

@Injectable()
export class TimeMapper extends BaseMapper<TimeEntity, TimeResponseDto> {
  toDto(entity: TimeEntity): TimeResponseDto {
    const dto = new TimeResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.state = entity.state;
    dto.country = entity.country;
    dto.titles = entity.titles;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  toEntityForCreate(createDto: CreateTimeDto): TimeEntity {
    const entity = new TimeEntity();
    entity.name = createDto.name;
    entity.state = createDto.state;
    entity.country = createDto.country;
    entity.titles = createDto.titles;
    return entity;
  }

  toEntityForUpdate(updateDto: UpdatePutTimeDto, existingEntity: TimeEntity): TimeEntity {
    const entity = existingEntity;
    if (updateDto.name !== undefined) {
      entity.name = updateDto.name;
    }
    if (updateDto.state !== undefined) {
      entity.state = updateDto.state;
    }
    if (updateDto.country !== undefined) {
      entity.country = updateDto.country;
    }
    if (updateDto.titles !== undefined) {
      entity.titles = updateDto.titles;
    }
    return entity;
  }
}