import { User } from "../entities/entity";
import { Request } from 'express';

export interface AuthRequest extends Request {
    user: User
}