import { IsJSON, IsNotEmpty, IsString, IsUUID } from "class-validator";




export class CreateUserRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsJSON()
    @IsNotEmpty()
    permissions: JSON;

    @IsUUID()
    @IsNotEmpty()
    userId: string;
}