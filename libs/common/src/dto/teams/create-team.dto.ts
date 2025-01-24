import { IsArray, IsNotEmpty, IsNumber } from "class-validator";


export class CreateTeamDto {
    @IsNumber()
    @IsNotEmpty()
    schoolId: number;

    @IsNumber()
    @IsNotEmpty()
    teacherId: number;

    @IsNumber({}, { each: true })
    @IsArray()
    @IsNotEmpty()
    studentsId: number[];
}