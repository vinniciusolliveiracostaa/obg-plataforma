import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: "nome", description: "Nome do aluno" })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ name: "email", description: "Email do aluno" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: "CPF", description: "CPF do aluno" })
  cpf: string;

  @IsPhoneNumber("BR")
  @IsNotEmpty()
  @ApiProperty({ name: "telefone", description: "Telefone do aluno" })
  phone: string;
}
