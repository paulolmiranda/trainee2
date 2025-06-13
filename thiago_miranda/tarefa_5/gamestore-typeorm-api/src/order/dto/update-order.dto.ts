import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UpdateOrderDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  customerName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  customerEmail?: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  customerPhone?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  gamesIds?: string[];
}
