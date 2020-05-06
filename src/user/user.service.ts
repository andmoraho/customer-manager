import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { UserLogin } from './interfaces/user-login.interface';
import { UserRegistered } from './interfaces/user-registered.interface';
import { Validation } from '../utils/validation';
import { GenerateToken } from '../utils/generateToken';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users.map(user => user.name);
  }
  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }
  async login(userLogin: UserLogin) {
    try {
      const { email, password } = userLogin;
      const { errors, isValid } = Validation.validateLoginInput(userLogin);
      if (!isValid) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: errors,
          },
          400,
        );
      }
      const existUser = await this.userModel.findOne({
        email,
      });

      if (!existUser) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'User not found',
          },
          400,
        );
      }

      const isMatch = await bcrypt.compare(password, existUser.password);

      if (!isMatch) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Unable to Login',
          },
          400,
        );
      }

      const token = GenerateToken.generate(existUser);

      return {
        name: existUser.name,
        email: existUser.email,
        token,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        400,
      );
    }
  }

  async register(userData: User): Promise<UserRegistered> {
    try {
      const { name, email, password } = userData;
      const { errors, isValid } = Validation.validateRegisterInput(userData);

      if (!isValid) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: errors,
          },
          400,
        );
      }

      const existEmail = await this.userModel.findOne({
        email,
      });

      if (existEmail) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Email already exists',
          },
          400,
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
      });
      const user = await newUser.save();
      return {
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        400,
      );
    }
  }
}
