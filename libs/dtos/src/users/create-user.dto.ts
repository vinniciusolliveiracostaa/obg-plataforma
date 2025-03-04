import { Domains } from '@repo/common/index';
import { IsArray, IsEnum, IsNotEmpty, IsObject, IsString, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak'
  })
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsEnum(Domains, { each: true })
  domainGroup: Domains[];

  @IsObject()
  @IsNotEmpty()
  roleData: any;

  @IsUUID()
  @IsNotEmpty()
  roleId: string;
}