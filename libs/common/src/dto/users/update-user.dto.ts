import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, isString, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Role } from '../../common/role.enum';

export class UpdateUserDto {
    @IsString()
        @IsString()
        @IsNotEmpty()
        id: string;
    
        @IsString()
        @IsOptional()
        name: string;
    
        @IsEmail()
        @IsOptional()
        email: string;

        @IsBoolean()
        @IsOptional()
        isVerified: boolean;

        @IsString()
        @IsOptional()
        avatar?: string;
    
        @IsString()
        @MinLength(8)
        @MaxLength(20)
        @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password too weak'})
        @IsOptional()
        password: string;
    
        @IsEnum(Role)
        @IsOptional()
        roles: Role[];
    
        @IsBoolean()
        @IsOptional()
        isActive: boolean = true;
}
