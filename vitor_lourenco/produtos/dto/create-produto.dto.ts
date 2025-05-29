import { IsUUID, IsString } from "class-validator";

export class CreateProdutoDto {
    @IsUUID()
   id : string;
    
    @IsString()
    nome : string;
    
    @IsString()
    cor: string;
    
    @IsString()
    marca: string
} 