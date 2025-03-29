import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  Length,
  Matches,
  IsEmail,
  IsPhoneNumber,
} from "class-validator";

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsPhoneNumber("BR")
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  @Matches(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, {
    message: "O CPF deve estar no formato XXX.XXX.XXX-XX ou XXXXXXXXXXX",
  })
  @ApiProperty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  schoolId: string;
}
