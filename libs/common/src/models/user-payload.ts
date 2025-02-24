import { Role } from "../common/role.enum";


export interface UserPayload {
    sub: string;
    email: string;
    name: string;
    roles: Role[];
    iat?: number;
    exp?: number;
}