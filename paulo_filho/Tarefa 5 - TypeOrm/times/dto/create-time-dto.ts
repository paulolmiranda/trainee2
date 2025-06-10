import { IsInt, IsString } from "class-validator";

export class CreateTimeDto{

    @IsString()
    name: string;

    @IsString()
    state: string;

    @IsString()
    country: string;

    @IsInt()
    titles: number;


}