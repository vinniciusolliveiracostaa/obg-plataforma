import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: "Nome", description: "Nome da Equipe" })
  name: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(3)
  @ApiProperty({
    name: "Alunos",
    description: "Lista de IDs dos alunos que farão parte da equipe",
    type: [String],
  })
  studentsId: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: "Professor",
    description: "ID do professor que está criando a equipe",
  })
  teacherId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: "Escola",
    description: "ID da escola onde a equipe está sendo criada",
  })
  schoolId: string;
}
