import { IsArray, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateUserDto } from "../user/create-user.dto";
import { Category } from "src/entities/common/caregories/categories.entity";

export class CreateTeacherDto extends CreateUserDto {
    @IsNumber()
    schoolId: number; // 'schoolId' deve ser um número

    @IsArray()
    @ValidateNested({ each: true })  // Valida que cada item no array é uma instância de Category
    @Type(() => Category)  // Transforma os itens para instâncias de Category
    categories: Category[];
}