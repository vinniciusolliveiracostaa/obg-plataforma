import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { UserRole } from "src/entities/user/user.entity";


export class CreateUserDto {
    
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;
    
    @IsPhoneNumber()
    tel: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsEnum(UserRole)
    role: UserRole;
}