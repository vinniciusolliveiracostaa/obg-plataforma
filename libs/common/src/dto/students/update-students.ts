import { Type } from "class-transformer";
import { IsNumber, IsArray, ValidateNested, IsString, IsDate, IsOptional } from "class-validator";
import { Category } from "src/entities/common/caregories/categories.entity";
import { CreateUserDto } from "../user/create-user.dto";

export class UpdateStudentDto extends CreateUserDto {
  @IsOptional()
  @IsNumber()
  schoolId?: number;

  @IsArray()
  @ValidateNested({ each: true }) // Valida que cada item no array é uma instância de Category
  @Type(() => Category) // Transforma os itens para instâncias de Category
  @IsOptional()
  categories?: Category[];

  @IsOptional()
  @IsNumber()
  serie?: number;

  @IsOptional()
  @IsNumber()
  nis?: number;

  @IsOptional()
  @IsNumber()
  teamId?: number;

  @IsOptional()
  @IsString()
  motherName?: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;
}
