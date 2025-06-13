import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  customerName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  customerPhone: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  gamesIds: string[];
}
