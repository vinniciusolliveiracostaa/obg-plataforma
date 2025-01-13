import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { CreateTeacherDto } from "./create-teacher";
import { Category } from "src/entities/common/caregories/categories.entity";

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
    @IsNumber()
    schoolId?: number; // `schoolId` continua sendo um número, mas é opcional para atualização.

    @IsArray()
    @Type(() => Category) // Garante que as categorias sejam corretamente transformadas
    categories?: Category[]; // `categories` agora é opcional para a atualização
}
