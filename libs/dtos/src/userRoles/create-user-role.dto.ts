import { IsJSON, IsNotEmpty, IsString } from "class-validator";




export class CreateUserRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsJSON()
    @IsNotEmpty()
    permissions: JSON;
}