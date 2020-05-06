import {
  Injectable,
  ArgumentMetadata,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Validator } from 'class-validator';

let errors = {
  email: '',
  password: '',
  name: '',
};
const validator = new Validator();

@Injectable()
export class Validation {
  // Validate Login
  public static validateLoginInput(data: any) {
    data.email = validator.isNotEmpty(data.email) ? data.email : '';
    data.password = validator.isNotEmpty(data.password) ? data.password : '';
    // Email
    if (validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
    }

    if (!validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }

    // Password
    if (validator.isEmpty(data.password)) {
      errors.password = 'Password field is required';
    }

    if (!validator.length(data.password, 8, 30)) {
      errors.password = 'Password must be at least 8 characters';
    }

    return {
      errors,
      isValid:
        validator.isEmpty(errors.email) || validator.isEmpty(errors.password),
    };
  }

  // validator Register
  public static validateRegisterInput(data: any) {
    data.name = validator.isNotEmpty(data.name) ? data.name : '';
    data.email = validator.isNotEmpty(data.email) ? data.email : '';
    data.password = validator.isNotEmpty(data.password) ? data.password : '';

    // Name
    if (validator.isEmpty(data.name)) {
      errors.name = 'Name field is required';
    }

    if (!validator.minLength(data.name, 2)) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email
    if (validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
    }

    if (!validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }

    // Password
    if (validator.isEmpty(data.password)) {
      errors.password = 'Password field is required';
    }

    if (!validator.minLength(data.password, 8)) {
      errors.password = 'Password must be at least 8 characters';
    }

    let isValid: boolean;

    if (
      validator.isEmpty(errors.name) &&
      validator.isEmpty(errors.email) &&
      validator.isEmpty(errors.password)
    ) {
      isValid = true;
    } else {
      isValid = false;
    }

    return {
      errors,
      isValid,
    };
  }
}
