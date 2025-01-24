import { IsArray, IsEnum, IsNotEmpty, IsString, IsUUID, Max, MaxLength, MinLength } from "class-validator";
import { GenreType, ColorOrRace, Category } from "../../entities/common/person/person.entity";


export class CreateTeacherDto {
    @IsUUID()
    @IsNotEmpty()
    schoolId: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(14)
    @MaxLength(14)
    cpf: string;
    
    @IsEnum(GenreType)
    @IsNotEmpty()
    genre: GenreType;
    
    @IsEnum(ColorOrRace)
    @IsNotEmpty()
    colorOrRace: ColorOrRace;
    
    @IsEnum(Category, { each: true }) // Certifique-se de que cada elemento na array é uma enumeração válida
    @IsArray()
    @IsNotEmpty()
    categories: Category[];

}