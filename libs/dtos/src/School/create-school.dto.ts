import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Nome da escola" })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(9, 9)
  @ApiProperty({ description: "Código da escola" })
  inep!: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: "Email da escola" })
  email!: string;

  @IsPhoneNumber("BR")
  @IsNotEmpty()
  @ApiProperty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @Length(14, 18)
  @Matches(/^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/, {
    message:
      "O CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX ou XXXXXXXXXXXXXX",
  })
  @ApiProperty({ description: "CNPJ da escola" })
  cnpj!: string;

  constructor(partial?: Partial<CreateSchoolDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
