import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../common/role.enum";
import { IsString, IsEmail, MinLength, MaxLength, Matches, IsEnum, IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    isVerified?: boolean = false;

    @IsString()
    @IsOptional()
    @ApiProperty()
    avatar?: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password too weak'})
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsEnum(Role)
    @IsNotEmpty()
    @ApiProperty()
    roles: Role[];

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    isActive: boolean = true;

    @IsOptional()
    @ApiProperty()
    roleData?: any
}