import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from '../models/user-from-jwt';
import { UserPayload } from '../models/user-payload';
import * as dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../../../../services/auth-service/.env');
dotenv.config({path: envPath});


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {

    const secretOrKey = process.env.JWT_SECRET;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      roles: payload.roles
    };
  }
}
