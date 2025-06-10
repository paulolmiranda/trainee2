import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeEntity } from './entity/time.entity';
import { CreateTimeDto } from './dto/create-time-dto';
import { UpdatePutTimeDto } from './dto/update-time-dto';
import { TimeResponseDto } from './dto/time-response-dto';
import { TimeMapper } from './mappers/time.mapper';

@Injectable()
export class TimesService {
  constructor(
    @InjectRepository(TimeEntity)
    private readonly timeRepository: Repository<TimeEntity>, 
    private readonly timeMapper: TimeMapper,
  ) {}

  async create(createDto: CreateTimeDto): Promise<TimeResponseDto> {
    const newTimeEntity = this.timeMapper.toEntityForCreate(createDto);
    const savedEntity = await this.timeRepository.save(newTimeEntity);
    return this.timeMapper.toDto(savedEntity);
  }

  async findAll(): Promise<TimeResponseDto[]> {
    const timeEntities = await this.timeRepository.find(); 
    return this.timeMapper.toDtoList(timeEntities);
  }

  async findOne(id: number): Promise<TimeResponseDto> {
    const timeEntity = await this.timeRepository.findOne({ where: { id } });
    if (!timeEntity) {
      throw new NotFoundException(`Time with ID "${id}" not found`);
    }
    return this.timeMapper.toDto(timeEntity);
  }

  async update(id: number, updateDto: UpdatePutTimeDto): Promise<TimeResponseDto> {
    const existingTimeEntity = await this.timeRepository.findOne({ where: { id } }); 
    if (!existingTimeEntity) {
      throw new NotFoundException(`Time with ID "${id}" not found`);
    }

    const updatedTimeEntity = this.timeMapper.toEntityForUpdate(updateDto, existingTimeEntity);
    const savedEntity = await this.timeRepository.save(updatedTimeEntity);
    return this.timeMapper.toDto(savedEntity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.timeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Time com "${id}" não encontrado.`);}
  }
}