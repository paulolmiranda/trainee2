import { IsNumber, IsString } from "class-validator";

export class CreateProdutoDto {
   // @IsNumber()
   // id : number;
    
    @IsString()
    nome : string;
    
    @IsString()
    cor: string;
    
    @IsString()
    marca: string
}
