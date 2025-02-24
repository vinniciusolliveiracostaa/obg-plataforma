import { Role } from "./role.enum";



export class AuthBody {
    id: string;
    email: string;
    name: string;
    role: Role;
}