import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: mongoose.Model<User>,
  ) {}

  async validateUser(payload: JwtPayload): Promise<any> {
    try {
      const validUser = await this.userModel.findOne({
        _id: payload.id,
        email: payload.email,
        name: payload.name,
      });
      if (!validUser) {
        return null;
      }
      return validUser;
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
