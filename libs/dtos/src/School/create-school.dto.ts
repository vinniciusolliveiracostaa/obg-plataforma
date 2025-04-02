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
  @ApiProperty()
  name: string;

  @IsString()
  @Length(8, 8)
  @IsNotEmpty()
  @ApiProperty()
  inep: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsPhoneNumber("BR")
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString()
  @Length(14, 18)
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/, {
    message: "CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX ou XXXXXXXXXXXXXX",
  })
  @IsNotEmpty()
  @ApiProperty()
  cnpj: string;
}
