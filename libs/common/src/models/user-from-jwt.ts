import { Role } from "../common/role.enum";

export class UserFromJwt {
    id: string;
    email: string;
    name: string;
    role: Role[];
  }
  