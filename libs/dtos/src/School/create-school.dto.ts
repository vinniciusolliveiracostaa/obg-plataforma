import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from "class-validator";

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: "Nome", description: "Nome da escola" })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ name: "Email", description: "Email da escola" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  @ApiProperty({ name: "INEP", description: "INEP da escola" })
  inep: string;

  @IsPhoneNumber("BR")
  @IsNotEmpty()
  @ApiProperty({ name: "Telefone", description: "Telefone da escola" })
  phone: string;
}
