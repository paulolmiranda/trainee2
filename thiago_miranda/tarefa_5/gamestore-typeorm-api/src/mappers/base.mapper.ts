export abstract class BaseMapper<TEntity, TDto> {
  abstract toDto(entity: TEntity): TDto;

  abstract toEntity(dto: TDto): TEntity | Partial<TEntity>;

  toDtos(entities: TEntity[]): TDto[] {
    return entities.map((entity) => this.toDto(entity));
  }

  toEntities(dtos: TDto[]): TEntity[] | Partial<TEntity>[] {
    return dtos.map((dto) => this.toEntity(dto));
  }
}
