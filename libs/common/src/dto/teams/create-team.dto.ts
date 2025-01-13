import { IsArray, IsNumber, isNumber } from "class-validator";


export class CreateTeamDto {
    @IsNumber()
    schoolId: number;

    @IsNumber()
    teacherId: number;

    @IsArray()
    @IsNumber({}, { each: true })  // Valida que cada item do array é um número
    studentId: number[];
}