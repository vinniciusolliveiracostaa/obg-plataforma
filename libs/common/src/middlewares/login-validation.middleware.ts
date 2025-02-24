import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { LoginRequestBody } from "../models/login-request";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    console.log("Middleware Body",body)

    const loginRequestBody = new LoginRequestBody();
    loginRequestBody.email = body.email;
    loginRequestBody.password = body.password;

    const validations = await validate(loginRequestBody);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints || {})];
        }, [])
      );
    }
    console.log("passando no middleware", loginRequestBody.email, loginRequestBody.password)

    next();
  }
}
