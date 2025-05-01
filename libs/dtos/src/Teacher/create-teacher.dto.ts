import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: "Nome", description: "Nome do Professor" })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ name: "Email", description: "Email do Professor" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: "CPF", description: "CPF do Professor" })
  cpf: string;

  @IsPhoneNumber("BR")
  @IsNotEmpty()
  @ApiProperty({ name: "Telefone", description: "Telefone do Professor" })
  phone: string;
}
