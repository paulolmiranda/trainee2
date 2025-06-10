import { IsInt, IsString, IsDate } from "class-validator";

export class UpdatePutTimeDto{

    @IsString()
    name: string;

    @IsString()
    state: string;

    @IsString()
    country: string;

    @IsInt()
    titles: number;


}