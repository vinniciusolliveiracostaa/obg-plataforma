import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Category, ColorOrRace, GenreType } from "../../entities/common/person/person.entity"



export class CreateStudentDto {
    @IsNumber()
    @IsNotEmpty()
    schoolId: number;

    @IsNotEmpty()
    @IsNumber()
    teamId: number;

    @IsNumber()
    @IsNotEmpty()
    serie: number;

    @IsString()
    @IsNotEmpty()
    motherName: string;

    @IsDateString()
    @IsNotEmpty()
    birthDate: string;

    @IsNumber()
    @IsOptional()
    nis?: number;

    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsEnum(GenreType)
    @IsNotEmpty()
    genre: GenreType;

    @IsEnum(ColorOrRace)
    @IsNotEmpty()
    colorOrRace: ColorOrRace;

    @IsEnum(Category)
    @IsArray()
    @IsNotEmpty()
    categories: Category[];
}