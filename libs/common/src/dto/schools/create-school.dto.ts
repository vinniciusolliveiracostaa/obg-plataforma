import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateSchoolDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsNumber()
    @IsNotEmpty()
    inep: number;
}