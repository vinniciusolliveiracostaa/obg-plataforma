import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Role } from "../../common/role.enum";

export class SignInDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password too weak",
  })
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
