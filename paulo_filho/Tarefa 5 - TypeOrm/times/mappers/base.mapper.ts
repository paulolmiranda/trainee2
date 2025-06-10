export abstract class BaseMapper<TEntity, TResponseDto> {
  // Converte uma entidade para o DTO de resposta
  abstract toDto(entity: TEntity): TResponseDto;

  // Converte uma lista de entidades para uma lista de DTOs de resposta
  toDtoList(entities: TEntity[]): TResponseDto[] {
    if (!entities) {
      return [];
    }
    return entities.map(entity => this.toDto(entity));
  }
}