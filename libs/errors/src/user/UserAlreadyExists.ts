import { AppException } from '../AppException';
import { HttpStatus } from '@nestjs/common';

export class UserAlreadyExists extends AppException {
  constructor(email: string) {
    super(
      'USER_ALREADY_EXISTS',
      `User with email ${email} already exists`,
      HttpStatus.CONFLICT,
      { email },
    );
  }
}
