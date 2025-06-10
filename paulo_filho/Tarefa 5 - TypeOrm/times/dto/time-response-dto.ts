import { IsDate, IsInt, IsString,IsNumber } from "class-validator";

export class TimeResponseDto{

    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    state: string;

    @IsString()
    country: string;

    @IsInt()
    titles: number;

    @IsDate()
    createdAt: Date;
    
    @IsDate()
    updatedAt: Date
    
}