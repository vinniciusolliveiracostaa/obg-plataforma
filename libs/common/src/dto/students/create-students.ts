import { Type } from "class-transformer";
import { IsNumber, IsArray, ValidateNested, IsString, IsDate } from "class-validator";
import { Category } from "src/entities/common/caregories/categories.entity";
import { CreateUserDto } from "../user/create-user.dto";

export class CreateStudentDto extends CreateUserDto {
  @IsNumber()
  schoolId: number; // 'schoolId' deve ser um número

  @IsArray()
  @ValidateNested({ each: true }) // Valida que cada item no array é uma instância de Category
  @Type(() => Category) // Transforma os itens para instâncias de Category
  categories: Category[];

  @IsNumber()
  serie: number;

  @IsNumber()
  nis?: number;

  @IsNumber()
  teamId?: number;

  @IsString()
  motherName?: string;

  @IsDate()
  birthDate?: Date;
}
