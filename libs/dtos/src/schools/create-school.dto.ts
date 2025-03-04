import { IsNotEmpty, IsString, IsUUID } from "class-validator";



export class CreateSchoolDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    inep: string;
}